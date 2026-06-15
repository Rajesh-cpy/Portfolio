const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add import
content = content.replace(
  "import { useTheme } from './context/ThemeContext';",
  "import { useTheme } from './context/ThemeContext';\nimport { portfolioData } from './data';"
);

// 2. Remove Data State and the massive useEffect
// Using a regex to match from "// Data State" down to the end of the useEffect
content = content.replace(
  /\/\/ Data State[\s\S]*?\/\/ 2\. Initialize Lenis Smooth Scroll/,
  "// 2. Initialize Lenis Smooth Scroll"
);

// 3. Replace Contact Form Submit
const contactSubmitRegex = /\/\/ 4\. Contact Form Submit[\s\S]*?\/\/ 5\. PDF Resume download logic/;
const newContactSubmit = `// 4. Contact Form Submit
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setValidationErrors({});

    // Simple validation checks
    const errors = {};
    if (!formState.name.trim()) errors.name = 'Name is required';
    if (!formState.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\\S+@\\S+\\.\\S+/.test(formState.email)) {
      errors.email = 'A valid email address is required';
    }
    if (!formState.message.trim()) errors.message = 'Message content is required';

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setIsSubmitting(false);
      return;
    }

    try {
      // NOTE: ReplaceYOUR_WEB3FORMS_ACCESS_KEY with your actual key from https://web3forms.com
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: "YOUR_WEB3FORMS_ACCESS_KEY",
          name: formState.name,
          email: formState.email,
          message: formState.message
        })
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setFormState({ name: '', email: '', message: '' });

        // Premium canvas confetti burst
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#7C3AED', '#06B6D4', '#F43F5E']
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      console.error('Contact form submission failed', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 5. PDF Resume download logic`;

content = content.replace(contactSubmitRegex, newContactSubmit);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated App.jsx');
