# Organ Donation Web App

This is a responsive and modern Organ Donation platform built with **React**, **Tailwind CSS**, and **Vite**. It supports three user types: **Donor**, **Receiver**, and **Doctor**. Each has separate login, signup, and profile pages. Donors and receivers can connect with each other.

## 🖥️ Features

- ✅ Separate login and signup pages for Donor, Receiver, and Doctor
- ✅ Individual profile pages for each user type
- ✅ Home page accessible to all
- ✅ Donor ↔ Receiver profile visibility and interaction
- ✅ Styled with Tailwind CSS using black, white, and green (`rgb(22,163,73)`)
- ✅ React Router for navigation
- ✅ Fully responsive and smooth scrolling

---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/organ-donation-app.git
   cd organ-donation-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. Open your browser at [http://localhost:5173](http://localhost:5173)

---

## 📁 Project Structure

```
src/
├── components/         # Reusable components
├── pages/              # All pages: Home, Login, Signup, Profiles
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── DonorProfile.jsx
│   ├── ReceiverProfile.jsx
│   ├── DoctorProfile.jsx
├── App.jsx             # App with router config
├── main.jsx            # Entry point
├── index.css           # Tailwind + custom styles
```

---

## 🎨 Styling

- Tailwind CSS is used for all styling
- Fonts used: Inter (body), Montserrat (headings)
- Main theme colors: black, white, and green `rgb(22,163,73)`

---

## 🧪 To Build for Production

```bash
npm run build
```

Then preview the build:
```bash
npm run preview
```

---

## 📄 License

MIT License

---

## 🙋‍♂️ Author

