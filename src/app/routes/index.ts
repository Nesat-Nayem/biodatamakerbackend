import { Router } from "express";
import { authRouter } from "../modules/auth/auth.routes";
import { categoryRouter } from "../modules/category/category.routes";
import { bannerRouter } from "../modules/banner/banner.routes";
import { contractRouter } from "../modules/contact/contract.routes";
import { faqRouter } from "../modules/faq/faq.routes";
import { privacyPolicyRouter } from "../modules/privacy-policy/privacy-policy.routes";
import { paymentPolicyRouter } from "../modules/payment-policy/payment-policy.routes";
import { disclaimerRouter } from "../modules/disclaimer/disclaimer.routes";
import { siteSecurityRouter } from "../modules/site-security/site-security.routes";
import { TermsConditionRouter } from "../modules/terms-condition/terms-condition.routes";
import { helpSupportRouter } from "../modules/help-support/help-support.routes";
import { blogRouter } from "../modules/blog/blog.routes";
import { blogCategoryRouter } from "../modules/blog-category/blog-category.routes";
import { offerBannerRouter } from "../modules/offer-banner/offer-banner.routes";
import { uploadRouter } from "../modules/upload/upload.routes";

// import { paymentRouter } from "../modules/payment/payment.routes";
import { aboutRouter } from "../modules/about/about.routes";
import { footerWidgetRouter } from "../modules/footer-widget/footer-widget.routes";
import { generalSettingsRouter } from "../modules/general-settings/general-settings.routes";

const router = Router();
const moduleRoutes = [
  {
    path: "/auth",
    route: authRouter,
  },

  {
    path: "/categories",
    route: categoryRouter,
  },

  {
    path: "/contracts",
    route: contractRouter,
  },

  {
    path: "/banners",
    route: bannerRouter,
  },

  {
    path: "/offer-banners",
    route: offerBannerRouter,
  },

  {
    path: "/about",
    route: aboutRouter,
  },

  {
    path: "/footer-widgets",
    route: footerWidgetRouter,
  },

  {
    path: "/general-settings",
    route: generalSettingsRouter,
  },



  {
    path: "/faqs",
    route: faqRouter,
  },

  {
    path: "/privacy-policy",
    route: privacyPolicyRouter,
  },

  {
    path: "/payment-policy",
    route: paymentPolicyRouter,
  },

  {
    path: "/disclaimer",
    route: disclaimerRouter,
  },

  {
    path: "/site-security",
    route: siteSecurityRouter,
  },

  {
    path: "/terms-conditions",
    route: TermsConditionRouter,
  },

  {
    path: "/help-support",
    route: helpSupportRouter,
  },

  {
    path: "/blog-categories",
    route: blogCategoryRouter,
  },

  {
    path: "/blogs",
    route: blogRouter,
  },

  {
    path: "/uploads",
    route: uploadRouter,
  },

  // {
  //   path: "/payments",
  //   route: paymentRouter,
  // },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
