import { NextFunction, Request, Response } from 'express';
import { Biodata } from './biodata.model';
import { biodataCreateValidation, biodataUpdateValidation } from './biodata.validation';
import { appError } from '../../errors/appError';

export const createBiodata = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, godName, sections, template } = req.body as any;

    // Accept sections as JSON string or object
    let parsedSections: any = sections;
    if (typeof sections === 'string') {
      try {
        parsedSections = JSON.parse(sections);
      } catch (e) {
        return next(new appError('Invalid JSON for sections', 400));
      }
    }

    const profileFile = (req.files as any)?.profilePhoto?.[0];
    const godFile = (req.files as any)?.godPhoto?.[0];

    const validated = biodataCreateValidation.parse({
      title,
      godName,
      sections: parsedSections,
      template,
      profilePhoto: profileFile?.path,
      godPhoto: godFile?.path,
    });

    const doc = new Biodata({
      ...validated,
      user: (req as any).user?._id,
    });

    await doc.save();

    res.status(201).json({ success: true, statusCode: 201, message: 'Biodata created successfully', data: doc });
  } catch (error) {
    next(error);
  }
};

export const getAllBiodata = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filter: any = { isDeleted: false };
    if ((req as any).user?.role !== 'admin') {
      filter.user = (req as any).user?._id;
    }
    const docs = await Biodata.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, statusCode: 200, message: 'Biodata retrieved successfully', data: docs });
  } catch (error) {
    next(error);
  }
};

export const getBiodataById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filter: any = { _id: req.params.id, isDeleted: false };
    if ((req as any).user?.role !== 'admin') filter.user = (req as any).user?._id;

    const doc = await Biodata.findOne(filter);
    if (!doc) return next(new appError('Biodata not found', 404));

    res.json({ success: true, statusCode: 200, message: 'Biodata retrieved successfully', data: doc });
  } catch (error) {
    next(error);
  }
};

export const updateBiodataById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const existing = await Biodata.findOne({ _id: req.params.id, isDeleted: false });
    if (!existing) return next(new appError('Biodata not found', 404));

    const { title, godName, sections, template } = req.body as any;

    let updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (godName !== undefined) updateData.godName = godName;
    if (template !== undefined) updateData.template = template;

    if (sections !== undefined) {
      if (typeof sections === 'string') {
        try {
          updateData.sections = JSON.parse(sections);
        } catch (e) {
          return next(new appError('Invalid JSON for sections', 400));
        }
      } else {
        updateData.sections = sections;
      }
    }

    const profileFile = (req.files as any)?.profilePhoto?.[0];
    const godFile = (req.files as any)?.godPhoto?.[0];
    if (profileFile) updateData.profilePhoto = profileFile.path;
    if (godFile) updateData.godPhoto = godFile.path;

    const validated = biodataUpdateValidation.parse(updateData);

    const updated = await Biodata.findByIdAndUpdate(req.params.id, validated, { new: true });
    res.json({ success: true, statusCode: 200, message: 'Biodata updated successfully', data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteBiodataById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await Biodata.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );
    if (!updated) return next(new appError('Biodata not found', 404));
    res.json({ success: true, statusCode: 200, message: 'Biodata deleted successfully', data: updated });
  } catch (error) {
    next(error);
  }
};
