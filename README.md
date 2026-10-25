# Student Registration Form

A responsive React form built with Vite and Bootstrap 5. It validates the six required fields and displays inline messages below invalid inputs.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

## Validation rules

- Name: required (`Name is required`)
- Username: must contain lowercase characters only (`Username must be lowercase only` when uppercase letters are present)
- College: required (`College is required`)
- Email: valid email format (`Enter a valid email address`)
- Password: at least 8 characters (`Password must be at least 8 characters`)
- Address: required (`Address is required`)

Every input has the exact required `name` attribute. The form prevents native submission and revalidates fields as the user corrects them after submitting.
# XStudentForm
