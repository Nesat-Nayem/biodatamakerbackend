import { NextFunction, Request, Response } from 'express';
import { Template } from './template.model';
import { templateCreateValidation, templateUpdateValidation } from './template.validation';
import { appError } from '../../errors/appError';
import { cloudinary } from '../../config/cloudinary';

const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

export const createTemplate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, slug, categories, previewImages, isActive, order } = req.body as any;

    const thumbFile = (req.files as any)?.thumbnail?.[0];
    if (!thumbFile) {
      return next(new appError('Template thumbnail is required', 400));
    }

    const thumbnail = thumbFile.path;

    let previews: string[] = [];
    const previewFiles = (req.files as any)?.previews || [];
    if (previewFiles.length) {
      previews = previewFiles.map((f: any) => f.path);
    } else if (previewImages) {
      try {
        const parsed = typeof previewImages === 'string' ? JSON.parse(previewImages) : previewImages;
        if (Array.isArray(parsed)) previews = parsed;
      } catch (e) {
        return next(new appError('Invalid JSON for previewImages', 400));
      }
    }

    const validated = templateCreateValidation.parse({
      name,
      slug: slug || slugify(name),
      thumbnail,
      previewImages: previews,
      categories: categories ? (typeof categories === 'string' ? JSON.parse(categories) : categories) : undefined,
      isActive: isActive === 'true' || isActive === true || undefined,
      order: order ? parseInt(order) : undefined,
    });

    const doc = new Template(validated);
    await doc.save();

    res.status(201).json({ success: true, statusCode: 201, message: 'Template created successfully', data: doc });
  } catch (error) {
    // cleanup uploaded files on error
    const files = (req.files as any) || {};
    const cleanup = (fileArr: any[], folder: string) => {
      for (const f of fileArr || []) {
        const publicId = f.path.split('/').pop()?.split('.')[0];
        if (publicId) cloudinary.uploader.destroy(`${folder}/${publicId}`).catch(() => void 0);
      }
    };
    cleanup(files.thumbnail, 'restaurant-templates');
    cleanup(files.previews, 'restaurant-templates');
    next(error);
  }
};

export const getAllTemplates = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { active } = req.query as any;
    const filter: any = { isDeleted: false };
    if (active === 'true') filter.isActive = true;

    const docs = await Template.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, statusCode: 200, message: 'Templates retrieved successfully', data: docs });
  } catch (error) {
    next(error);
  }
};

export const getTemplateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await Template.findOne({ _id: req.params.id, isDeleted: false });
    if (!doc) return next(new appError('Template not found', 404));

    res.json({ success: true, statusCode: 200, message: 'Template retrieved successfully', data: doc });
  } catch (error) {
    next(error);
  }
};

export const updateTemplateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, slug, categories, previewImages, isActive, order } = req.body as any;

    const existing = await Template.findOne({ _id: id, isDeleted: false });
    if (!existing) return next(new appError('Template not found', 404));

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (slug !== undefined) updateData.slug = slug || slugify(name || existing.name);
    if (categories !== undefined) updateData.categories = typeof categories === 'string' ? JSON.parse(categories) : categories;
    if (isActive !== undefined) updateData.isActive = isActive === 'true' || isActive === true;
    if (order !== undefined) updateData.order = parseInt(order);

    const thumbFile = (req.files as any)?.thumbnail?.[0];
    if (thumbFile) {
      updateData.thumbnail = thumbFile.path;
      if ((existing as any).thumbnail) {
        const publicId = (existing as any).thumbnail.split('/').pop()?.split('.')[0];
        if (publicId) await cloudinary.uploader.destroy(`restaurant-templates/${publicId}`);
      }
    }

    const previewFiles = (req.files as any)?.previews || [];
    if (previewFiles.length) {
      updateData.previewImages = previewFiles.map((f: any) => f.path);
    } else if (previewImages !== undefined) {
      try {
        const parsed = typeof previewImages === 'string' ? JSON.parse(previewImages) : previewImages;
        updateData.previewImages = parsed;
      } catch (e) {
        return next(new appError('Invalid JSON for previewImages', 400));
      }
    }

    const validated = templateUpdateValidation.parse(updateData);
    const updated = await Template.findByIdAndUpdate(id, validated, { new: true });

    res.json({ success: true, statusCode: 200, message: 'Template updated successfully', data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteTemplateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await Template.findOneAndUpdate({ _id: req.params.id, isDeleted: false }, { isDeleted: true }, { new: true });
    if (!updated) return next(new appError('Template not found', 404));
    res.json({ success: true, statusCode: 200, message: 'Template deleted successfully', data: updated });
  } catch (error) {
    next(error);
  }
};
