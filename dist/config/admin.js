"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Define a qué página de Next.js debe ir el preview
 */
const getPreviewPathname = (uid, { document }) => {
    switch (uid) {
        // HOME (single type)
        case "api::home-page.home-page":
            return "/";
        // FOOTER (single type)
        case "api::footer.footer":
            return "/";
        // PRODUCTOS (collection type con slug)
        // case "api::product.product":
        //   if (!document?.slug) {
        //     return "/products";
        //   }
        // return `/products/${document.slug}`;
        default:
            return "/";
    }
};
const config = ({ env, }) => ({
    auth: {
        secret: env("ADMIN_JWT_SECRET"),
    },
    apiToken: {
        salt: env("API_TOKEN_SALT"),
    },
    transfer: {
        token: {
            salt: env("TRANSFER_TOKEN_SALT"),
        },
    },
    secrets: {
        encryptionKey: env("ENCRYPTION_KEY"),
    },
    flags: {
        nps: env.bool("FLAG_NPS", true),
        promoteEE: env.bool("FLAG_PROMOTE_EE", true),
    },
    /**
     * CONFIGURACIÓN PREVIEW
     */
    preview: {
        enabled: true,
        config: {
            // dominio permitido (Next.js)
            allowedOrigins: [env("CLIENT_URL")],
            async handler(uid, { documentId, locale, status, }) {
                try {
                    console.log("CLIENT_URL:", env("CLIENT_URL"));
                    console.log("PREVIEW_SECRET:", env("PREVIEW_SECRET"));
                    // obtenemos el documento desde Strapi
                    const document = await strapi.documents(uid).findOne({
                        documentId,
                        fields: ["slug"],
                    });
                    if (!document) {
                        console.error(`Documento no encontrado: ${documentId} para UID: ${uid}`);
                        return null;
                    }
                    // obtenemos ruta en Next
                    const pathname = getPreviewPathname(uid, { document });
                    console.log("pathname generado:", pathname);
                    console.log("URL final:", `${env("CLIENT_URL")}/api/preview?url=${pathname}&status=${status}`);
                    if (!pathname) {
                        console.warn(`No se pudo generar pathname para UID: ${uid}`);
                        return null;
                    }
                    const normalizedStatus = status === "published" ? "published" : "draft";
                    // construimos URL para Next preview
                    const urlSearchParams = new URLSearchParams({
                        url: pathname,
                        secret: env("PREVIEW_SECRET"),
                        status: normalizedStatus,
                    });
                    const previewUrl = `${env("CLIENT_URL")}/api/preview?${urlSearchParams}`;
                    console.log("✅ URL de preview generada:", previewUrl);
                    return previewUrl;
                }
                catch (error) {
                    console.error("Error generando preview URL:", error);
                    return null;
                }
            },
        },
    },
});
exports.default = config;
// import type { Core } from '@strapi/strapi';
// const getPreviewPathname = (uid, { locale, document }): string | null => {
//   switch (uid) {
//     case "api::home-page.home-page":
//       return "/";
//     default:
//       return null;
//   }
// };
// const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Admin => ({
//   auth: { secret: env('ADMIN_JWT_SECRET') },
//   apiToken: { salt: env('API_TOKEN_SALT') },
//   transfer: { token: { salt: env('TRANSFER_TOKEN_SALT') } },
//   secrets: { encryptionKey: env('ENCRYPTION_KEY') },
//   flags: {
//     nps: env.bool('FLAG_NPS', true),
//     promoteEE: env.bool('FLAG_PROMOTE_EE', true),
//   },
//   preview: {
//     enabled: true,
//     config: {
//       allowedOrigins: [env('CLIENT_URL')],
//       async handler(uid, { documentId, locale, status }) {
//         const document = await strapi.documents(uid as any).findOne({ documentId });
//         if (!document) return null;
//         const pathname = getPreviewPathname(uid, { locale, document });
//         if (!pathname) return null;
//         const normalizedStatus = status === "published" ? "published" : "draft";
//         const urlSearchParams = new URLSearchParams({
//           url: pathname,
//           secret: env('PREVIEW_SECRET'),
//           status: normalizedStatus,
//         });
//          const previewUrl = `${env("CLIENT_URL")}/api/preview?${urlSearchParams}`;
//          console.log("✅ URL de preview generada:", previewUrl);
//         return `${env("CLIENT_URL")}/api/preview?${urlSearchParams}`;
//       },
//     },
//   },
// });
// export default config;
