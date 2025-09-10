import { NextFunction, Request, Response } from "express";
import { Banner } from "./banner.model";
import { bannerValidation, bannerUpdateValidation } from "./banner.validation";
import { appError } from "../../errors/appError";
import { cloudinary } from "../../config/cloudinary";

export const createBanner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  
  try {
    const {
      title,
      description,
      isActive,
      order,
      // JSON string versions
      primaryButton,
      secondaryButton,
      // Fallback flat fields
      primaryButtonLabel,
      primaryButtonHref,
      secondaryButtonLabel,
      secondaryButtonHref,
    } = req.body as any;
    
    // If image is uploaded through multer middleware, req.file will be available
    if (!req.file) {
       next(new appError("Banner image is required", 400));
       return;
    }

    // Get the image URL from req.file
    const image = req.file.path;
    
    // Build button objects (accept JSON strings or flat fields)
    let parsedPrimaryButton: any;
    let parsedSecondaryButton: any | undefined;
    try {
      if (primaryButton) {
        parsedPrimaryButton = JSON.parse(primaryButton);
      } else {
        parsedPrimaryButton = {
          label: primaryButtonLabel,
          href: primaryButtonHref,
        };
      }
    } catch (e) {
      return next(new appError("Invalid JSON for primaryButton", 400));
    }
    try {
      if (secondaryButton) {
        parsedSecondaryButton = JSON.parse(secondaryButton);
      } else if (secondaryButtonLabel || secondaryButtonHref) {
        parsedSecondaryButton = {
          label: secondaryButtonLabel,
          href: secondaryButtonHref,
        };
      }
    } catch (e) {
      return next(new appError("Invalid JSON for secondaryButton", 400));
    }
    
    // Validate the input
    const validatedData = bannerValidation.parse({ 
      title,
      description,
      image,
      primaryButton: parsedPrimaryButton,
      secondaryButton: parsedSecondaryButton,
      isActive: isActive === 'true' || isActive === true,
      order: order ? parseInt(order as string) : undefined,
    });

    // Create a new banner
    const banner = new Banner(validatedData);
    await banner.save();

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Banner created successfully",
      data: banner,
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

export const getAllBanners = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get only active banners if requested
    const { active } = req.query;
    const filter: any = { isDeleted: false };
    
    if (active === 'true') {
      filter.isActive = true;
    }
    
    const banners = await Banner.find(filter).sort({ order: 1, createdAt: -1 });
    
    if (banners.length === 0) {
       res.json({
        success: true,
        statusCode: 200,
        message: "No banners found",
        data: [],
      });
      return
    }

    res.json({
      success: true,
      statusCode: 200,
      message: "Banners retrieved successfully",
      data: banners,
    });
    return;
  } catch (error) {
    
    next(error);
  }
};

export const getBannerById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const banner = await Banner.findOne({ 
      _id: req.params.id, 
      isDeleted: false 
    });
    
    if (!banner) {
      return next(new appError("Banner not found", 404));
    }

    res.json({
      success: true,
      statusCode: 200,
      message: "Banner retrieved successfully",
      data: banner,
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const updateBannerById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bannerId = req.params.id;
    const {
      title,
      description,
      isActive,
      order,
      primaryButton,
      secondaryButton,
      primaryButtonLabel,
      primaryButtonHref,
      secondaryButtonLabel,
      secondaryButtonHref,
    } = req.body as any;
    
    // Find the banner to update
    const banner = await Banner.findOne({ 
      _id: bannerId, 
      isDeleted: false 
    });
    
    if (!banner) {
       next(new appError("Banner not found", 404));
       return;
    }

    // Prepare update data
    const updateData: any = {};
    
    if (title !== undefined) {
      updateData.title = title;
    }
    if (description !== undefined) {
      updateData.description = description;
    }
    
    if (isActive !== undefined) {
      updateData.isActive = isActive === 'true' || isActive === true;
    }
    
    if (order !== undefined) {
      updateData.order = parseInt(order as string);
    }

    // If there's a new image
    if (req.file) {
      updateData.image = req.file.path;
      
      // Delete the old image from cloudinary if it exists
      if (banner.image) {
        const publicId = banner.image.split('/').pop()?.split('.')[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`restaurant-banners/${publicId}`);
        }
      }
    }

    // Primary button (accept JSON string or flat fields)
    try {
      if (primaryButton) {
        const pb = JSON.parse(primaryButton);
        updateData.primaryButton = pb;
      } else if (primaryButtonLabel !== undefined || primaryButtonHref !== undefined) {
        const existingPB: any = (banner as any).primaryButton || {};
        updateData.primaryButton = {
          label: primaryButtonLabel ?? existingPB.label,
          href: primaryButtonHref ?? existingPB.href,
        };
      }
    } catch (e) {
      return next(new appError("Invalid JSON for primaryButton", 400));
    }

    // Secondary button
    try {
      if (secondaryButton) {
        const sb = JSON.parse(secondaryButton);
        updateData.secondaryButton = sb;
      } else if (secondaryButtonLabel !== undefined || secondaryButtonHref !== undefined) {
        const existingSB: any = (banner as any).secondaryButton || {};
        updateData.secondaryButton = {
          label: secondaryButtonLabel ?? existingSB.label,
          href: secondaryButtonHref ?? existingSB.href,
        };
      }
    } catch (e) {
      return next(new appError("Invalid JSON for secondaryButton", 400));
    }

    // Validate the update data
    if (Object.keys(updateData).length > 0) {
      const validatedData = bannerUpdateValidation.parse(updateData);
      
      // Update the banner
      const updatedBanner = await Banner.findByIdAndUpdate(
        bannerId,
        validatedData,
        { new: true }
      );

       res.json({
        success: true,
        statusCode: 200,
        message: "Banner updated successfully",
        data: updatedBanner,
      });
      return;
      
    }

    // If no updates provided
     res.json({
      success: true,
      statusCode: 200,
      message: "No changes to update",
      data: banner,
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

export const deleteBannerById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const banner = await Banner.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );
    
    if (!banner) {
       next(new appError("Banner not found", 404));
       return;
    }

    
    res.json({
      success: true,
      statusCode: 200,
      message: "Banner deleted successfully",
      data: banner,
    });
    return;
  } catch (error) {
    next(error);
  }
};
