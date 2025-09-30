import { NextFunction, Request, Response } from "express";
import { BioTemplate } from "./biotemplate.model";
import { biotemplateValidation, biotemplateUpdateValidation } from "./biotemplate.validation";
import { appError } from "../../errors/appError";
import { cloudinary } from "../../config/cloudinary";

export const createBioTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { templatename } = req.body;
    
    // If banner image is uploaded through multer middleware, req.file will be available
    if (!req.file) {
      next(new appError("Banner image is required", 400));
      return;
    }

    // Get the banner URL from req.file
    const banner = req.file.path;
    
    // Validate the input
    const validatedData = biotemplateValidation.parse({ 
      templatename,
      banner,
    });

    // Create a new biotemplate
    const biotemplate = new BioTemplate(validatedData);
    await biotemplate.save();

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "BioTemplate created successfully",
      data: biotemplate,
    });
    return;
  } catch (error) {
    // If error is during image upload, delete the uploaded image if any
    if (req.file?.path) {
      const publicId = req.file.path.split('/').pop()?.split('.')[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`restaurant-banners/${publicId}`);
      }
    }
    next(error);
  }
};

export const getAllBioTemplates = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filter: any = { isDeleted: false };
    
    const biotemplates = await BioTemplate.find(filter).sort({ createdAt: -1 });
    
    if (biotemplates.length === 0) {
      res.json({
        success: true,
        statusCode: 200,
        message: "No biotemplates found",
        data: [],
      });
      return;
    }

    res.json({
      success: true,
      statusCode: 200,
      message: "BioTemplates retrieved successfully",
      data: biotemplates,
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const getBioTemplateById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const biotemplate = await BioTemplate.findOne({ 
      _id: req.params.id, 
      isDeleted: false 
    });
    
    if (!biotemplate) {
      return next(new appError("BioTemplate not found", 404));
    }

    res.json({
      success: true,
      statusCode: 200,
      message: "BioTemplate retrieved successfully",
      data: biotemplate,
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const updateBioTemplateById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const biotemplateId = req.params.id;
    const { templatename } = req.body;
    
    // Find the biotemplate to update
    const biotemplate = await BioTemplate.findOne({ 
      _id: biotemplateId, 
      isDeleted: false 
    });
    
    if (!biotemplate) {
      next(new appError("BioTemplate not found", 404));
      return;
    }

    // Prepare update data
    const updateData: any = {};
    
    if (templatename !== undefined) {
      updateData.templatename = templatename;
    }

    // If there's a new banner image
    if (req.file) {
      updateData.banner = req.file.path;
      
      // Delete the old image from cloudinary if it exists
      if (biotemplate.banner) {
        const publicId = biotemplate.banner.split('/').pop()?.split('.')[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`restaurant-banners/${publicId}`);
        }
      }
    }

    // Validate the update data
    if (Object.keys(updateData).length > 0) {
      const validatedData = biotemplateUpdateValidation.parse(updateData);
      
      // Update the biotemplate
      const updatedBioTemplate = await BioTemplate.findByIdAndUpdate(
        biotemplateId,
        validatedData,
        { new: true }
      );

      res.json({
        success: true,
        statusCode: 200,
        message: "BioTemplate updated successfully",
        data: updatedBioTemplate,
      });
      return;
    }

    // If no updates provided
    res.json({
      success: true,
      statusCode: 200,
      message: "No changes to update",
      data: biotemplate,
    });
    return;
  } catch (error) {
    // If error occurs and image was uploaded, delete it
    if (req.file?.path) {
      const publicId = req.file.path.split('/').pop()?.split('.')[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`restaurant-banners/${publicId}`);
      }
    }
    next(error);
  }
};

export const deleteBioTemplateById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const biotemplate = await BioTemplate.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );
    
    if (!biotemplate) {
      next(new appError("BioTemplate not found", 404));
      return;
    }

    res.json({
      success: true,
      statusCode: 200,
      message: "BioTemplate deleted successfully",
      data: biotemplate,
    });
    return;
  } catch (error) {
    next(error);
  }
};
