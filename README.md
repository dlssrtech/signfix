# SignFix

Sign board sales, service, maintenance and field-operations platform by **DL SSR INFOTECH**. The monorepo contains two Flutter applications, a responsive React operations console, a secured Node/Express REST API, and a MySQL relational schema.

## Run locally

```bash
npm install
npm run dev       # admin at http://localhost:5173
npm run server    # API at http://localhost:4000
```

Run the Flutter clients with the API URL for the target device:

```bash
cd apps/customer_app && flutter pub get && flutter run --dart-define=API_URL=http://10.0.2.2:4000/api
cd apps/technician_app && flutter pub get && flutter run --dart-define=API_URL=http://10.0.2.2:4000/api
```

Use `localhost` for desktop/iOS simulator and the development machine's LAN address for physical devices. Demo accounts use `SignFix@123`: `customer@signfix.in`, `tech@signfix.in`, and `admin@signfix.in`.

## Business invariants

- Customer calculator values are always labelled **Estimated Price**.
- Only an admin-approved quotation is an official commercial amount.
- Asset QR tokens reveal no customer information without authenticated authorization.
- AI suggestions are concepts and cannot promise feasibility, price, or delivery dates.

## Architecture

- `src/`: responsive React admin interface and interaction layer.
- `apps/customer_app/`: customer login, dashboard, connected order calculator/wizard, photo/GPS service request, tracking, and AI support.
- `apps/technician_app/`: technician login, live job queue, navigation, enforced status workflow, evidence upload, notes, materials, and customer OTP completion.
- `server/`: shared REST API with JWT roles, validation, uploads, pricing, customer orders/services, technician jobs, AI guidance, and an admin dashboard feed.
- `database/`: MySQL schema for identity, commerce, field service, assets, AI, notifications, and audit history.

Configure `JWT_SECRET`, database credentials, object storage, maps, FCM, and the LLM provider through environment variables before production deployment.
