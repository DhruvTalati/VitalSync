# VitalSync

Smart Health Data Synchronization System — MERN stack application.

## Structure

```
client/   React 19 + Vite + Tailwind frontend
server/   Node.js + Express + MongoDB backend
```

## Setup

### Server

```
cd server
cp .env.example .env
npm install
npm run dev
```

### Client

```
cd client
cp .env.example .env
npm install
npm run dev
```

## Pages implemented so far

- Landing page (`/`)
- Login (`/login`)
- Register (`/register`)
- Patient Dashboard (`/dashboard`)
- Add Vitals (`/dashboard/add-vitals`)
- Medical Records (`/dashboard/medical-records`)
- Book Appointment (`/dashboard/book-appointment`)
- Prescriptions (`/dashboard/prescriptions`)
- My Wallet (`/dashboard/wallet`)
- Doctor Dashboard (`/doctor/dashboard`)
- Doctor Patient List (`/doctor/patients`)
- Doctor Patient Vitals (`/doctor/patients/:patientId/vitals`)
- Doctor Patient Records (`/doctor/patients/:patientId/records`)
- Doctor Medical Records / Add Diagnosis (`/doctor/medical-records`)
- Doctor Prescriptions (`/doctor/prescriptions`)
- Doctor Wallet (`/doctor/wallet`)
- Video Consultation (`/doctor/video-call/:appointmentId`)

## API

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`
- `GET /api/vitals`
- `POST /api/vitals`
- `DELETE /api/vitals/:id`
- `GET /api/medical-records`
- `POST /api/medical-records`
- `GET /api/appointments/doctors`
- `GET /api/appointments`
- `POST /api/appointments`
- `DELETE /api/appointments/:id`
- `PATCH /api/appointments/:id/status`
- `GET /api/facilities`
- `GET /api/prescriptions`
- `POST /api/prescriptions`
- `DELETE /api/prescriptions/:id`
- `GET /api/wallet`
- `POST /api/wallet/add-funds`
- `POST /api/wallet/pay-bill/:billId`
- `GET /api/health`
- `GET /api/doctor/stats`
- `GET /api/doctor/abnormal-vitals`
- `GET /api/doctor/patients`
- `GET /api/doctor/my-patients`
- `GET /api/doctor/beds`
- `PATCH /api/doctor/beds/:id`
- `GET /api/doctor/blood-inventory`
- `PATCH /api/doctor/blood-inventory/:bloodGroup`
- `GET /api/appointments/doctor/mine`
- `GET /api/medical-records/doctor/mine`
- `GET /api/medical-records/patient/:patientId`
- `GET /api/prescriptions/doctor/mine`
- `GET /api/vitals/patient/:patientId`

Run `npm run seed:hospital` inside `server/` to seed clinic beds and blood bank inventory used on the Doctor Dashboard.

Run `npm run seed:facilities` inside `server/` to seed nearby medical facilities for Anand, Gujarat used on the Book Appointment map.

## Notes

More pages, models, controllers, and routes will be added as further screenshots are provided, without regenerating existing files unless required.
