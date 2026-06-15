# ✉️ Email Reply Generator (Frontend)

A modern React-based web application that generates smart, human-like email replies using AI. Built with a focus on clean UI/UX and real-world usability.

---

## 🚀 Features

* 📝 Paste email content and generate replies instantly
* 🎯 Select tone (Professional, Friendly, Casual, Formal)
* ⚡ Fast API integration with backend (Spring Boot)
* 📋 Copy generated reply to clipboard
* 🔄 Clear/reset functionality
* ⏳ Loading state for better user experience
* 🎨 Clean, responsive UI using Material UI

---

## 🛠️ Tech Stack

* **Frontend:** React (Vite)
* **UI Library:** Material UI (MUI)
* **HTTP Client:** Axios
* **State Management:** React Hooks

---

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/email-reply-generator-frontend.git
cd email-reply-generator-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

App will run on:

```
http://localhost:5173
```

---

## 🔗 Backend Integration

Make sure your backend is running on:

```
http://localhost:8080
```

API endpoint used:

```
POST /api/email/generate
```

### Request Body

```json
{
  "email": "Your email content here",
  "tone": "professional"
}
```

### Response Format

```json
{
  "reply": "Generated email reply..."
}
```

---

## 📁 Project Structure

```
src/
│── App.jsx        # Main UI logic
│── main.jsx       # Entry point
│── components/    # (Optional future components)
```

---

## 🎯 UI/UX Highlights

* Card-based layout for better structure
* Clear separation between input and output
* Responsive design for different screen sizes
* Minimal and intuitive interface
* Real-time feedback (loading, disabled states)

---

## 🚀 Future Improvements

* 🌙 Dark mode support
* 💬 Multiple AI-generated reply options
* 📚 Reply history (local storage)
* 🌐 Chrome Extension version
* 🎨 Advanced UI animations

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a PR.

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 👨‍💻 Author

**Bikash**
Frontend Developer | Java Full Stack Enthusiast

---
# Smart-email-assistant-frontend
