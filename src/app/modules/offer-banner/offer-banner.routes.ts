import express from 'express';
import { auth } from '../../middlewares/authMiddleware';
import { upload } from '../../config/cloudinary';
import {
  createOfferBanner,
  getAllOfferBanners,
  getOfferBannerById,
  updateOfferBannerById,
  deleteOfferBannerById,
} from './offer-banner.controller';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     OfferBanner:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         title: { type: string }
 *         subtitle: { type: string }
 *         offer: { type: string }
 *         url: { type: string }
 *         image: { type: string, description: 'Image URL' }
 *         isDeleted: { type: boolean }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 *       example:
 *         _id: "66d0a1f1f2c3a4b5c6d7e8f9"
 *         title: "Back To School Deals"
 *         subtitle: "Top picks for students"
 *         offer: "Save up to 40% on laptops"
 *         url: "https://example.com/deals/back-to-school"
 *         image: "https://res.cloudinary.com/demo/image/upload/v1724661000/offer-banners/bts.jpg"
 *         isDeleted: false
 *         createdAt: "2025-08-26 10:15:00"
 *         updatedAt: "2025-08-26 10:15:00"
 *     OfferBannerResponse:
 *       type: object
 *       properties:
 *         success: { type: boolean }
 *         statusCode: { type: integer }
 *         message: { type: string }
 *         data:
 *           $ref: '#/components/schemas/OfferBanner'
 *     OfferBannerListResponse:
 *       type: object
 *       properties:
 *         success: { type: boolean }
 *         statusCode: { type: integer }
 *         message: { type: string }
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OfferBanner'
 */

/**
 * @swagger
 * /v1/api/offer-banners:
 *   get:
 *     summary: Get all offer banners
 *     tags: [Offer Banners]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OfferBannerListResponse'
 */
router.get('/', getAllOfferBanners);

/**
 * @swagger
 * /v1/api/offer-banners/{id}:
 *   get:
 *     summary: Get an offer banner by ID
 *     tags: [Offer Banners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OfferBannerResponse'
 *       404:
 *         description: Not found
 */
router.get('/:id', getOfferBannerById);

/**
 * @swagger
 * /v1/api/offer-banners:
 *   post:
 *     summary: Create an offer banner
 *     tags: [Offer Banners]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [title, subtitle, offer, url, image]
 *             properties:
 *               title: { type: string }
 *               subtitle: { type: string }
 *               offer: { type: string }
 *               url: { type: string }
 *               image: { type: string, format: binary }
 *           encoding:
 *             image:
 *               contentType: image/png, image/jpeg
 *           examples:
 *             Default:
 *               summary: Create an offer banner
 *               value:
 *                 title: "Back To School Deals"
 *                 subtitle: "Top picks for students"
 *                 offer: "Save up to 40% on laptops"
 *                 url: "https://example.com/deals/back-to-school"
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OfferBannerResponse'
 */
router.post('/', auth('admin'), upload.single('image'), createOfferBanner);

/**
 * @swagger
 * /v1/api/offer-banners/{id}:
 *   put:
 *     summary: Update an offer banner
 *     tags: [Offer Banners]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               subtitle: { type: string }
 *               offer: { type: string }
 *               url: { type: string }
 *               image: { type: string, format: binary }
 *           examples:
 *             TextOnly:
 *               summary: Update text fields only
 *               value:
 *                 title: "Back To School Super Deals"
 *                 subtitle: "Best picks for campus life"
 *                 offer: "Save up to 45% on laptops"
 *                 url: "https://example.com/deals/back-to-school"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OfferBannerResponse'
 */
router.put('/:id', auth('admin'), upload.single('image'), updateOfferBannerById);

/**
 * @swagger
 * /v1/api/offer-banners/{id}:
 *   delete:
 *     summary: Delete an offer banner
 *     tags: [Offer Banners]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OfferBannerResponse'
 */
router.delete('/:id', auth('admin'), deleteOfferBannerById);

export const offerBannerRouter = router;
