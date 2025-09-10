"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = require("../modules/auth/auth.routes");
const category_routes_1 = require("../modules/category/category.routes");
const banner_routes_1 = require("../modules/banner/banner.routes");
const contract_routes_1 = require("../modules/contact/contract.routes");
const faq_routes_1 = require("../modules/faq/faq.routes");
const privacy_policy_routes_1 = require("../modules/privacy-policy/privacy-policy.routes");
const payment_policy_routes_1 = require("../modules/payment-policy/payment-policy.routes");
const disclaimer_routes_1 = require("../modules/disclaimer/disclaimer.routes");
const site_security_routes_1 = require("../modules/site-security/site-security.routes");
const terms_condition_routes_1 = require("../modules/terms-condition/terms-condition.routes");
const help_support_routes_1 = require("../modules/help-support/help-support.routes");
const blog_routes_1 = require("../modules/blog/blog.routes");
const blog_category_routes_1 = require("../modules/blog-category/blog-category.routes");
const offer_banner_routes_1 = require("../modules/offer-banner/offer-banner.routes");
const upload_routes_1 = require("../modules/upload/upload.routes");
// import { paymentRouter } from "../modules/payment/payment.routes";
const about_routes_1 = require("../modules/about/about.routes");
const footer_widget_routes_1 = require("../modules/footer-widget/footer-widget.routes");
const general_settings_routes_1 = require("../modules/general-settings/general-settings.routes");
const template_routes_1 = require("../modules/template/template.routes");
const plan_routes_1 = require("../modules/plan/plan.routes");
const biodata_routes_1 = require("../modules/biodata/biodata.routes");
const order_routes_1 = require("../modules/order/order.routes");
const payment_routes_1 = require("../modules/payment/payment.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_routes_1.authRouter,
    },
    {
        path: "/categories",
        route: category_routes_1.categoryRouter,
    },
    {
        path: "/contracts",
        route: contract_routes_1.contractRouter,
    },
    {
        path: "/banners",
        route: banner_routes_1.bannerRouter,
    },
    {
        path: "/templates",
        route: template_routes_1.templateRouter,
    },
    {
        path: "/plans",
        route: plan_routes_1.planRouter,
    },
    {
        path: "/biodata",
        route: biodata_routes_1.biodataRouter,
    },
    {
        path: "/orders",
        route: order_routes_1.orderRouter,
    },
    {
        path: "/payments",
        route: payment_routes_1.paymentRouter,
    },
    {
        path: "/offer-banners",
        route: offer_banner_routes_1.offerBannerRouter,
    },
    {
        path: "/about",
        route: about_routes_1.aboutRouter,
    },
    {
        path: "/footer-widgets",
        route: footer_widget_routes_1.footerWidgetRouter,
    },
    {
        path: "/general-settings",
        route: general_settings_routes_1.generalSettingsRouter,
    },
    {
        path: "/faqs",
        route: faq_routes_1.faqRouter,
    },
    {
        path: "/privacy-policy",
        route: privacy_policy_routes_1.privacyPolicyRouter,
    },
    {
        path: "/payment-policy",
        route: payment_policy_routes_1.paymentPolicyRouter,
    },
    {
        path: "/disclaimer",
        route: disclaimer_routes_1.disclaimerRouter,
    },
    {
        path: "/site-security",
        route: site_security_routes_1.siteSecurityRouter,
    },
    {
        path: "/terms-conditions",
        route: terms_condition_routes_1.TermsConditionRouter,
    },
    {
        path: "/help-support",
        route: help_support_routes_1.helpSupportRouter,
    },
    {
        path: "/blog-categories",
        route: blog_category_routes_1.blogCategoryRouter,
    },
    {
        path: "/blogs",
        route: blog_routes_1.blogRouter,
    },
    {
        path: "/uploads",
        route: upload_routes_1.uploadRouter,
    },
    // {
    //   path: "/payments",
    //   route: paymentRouter,
    // },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
