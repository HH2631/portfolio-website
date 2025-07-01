import React, { useState, useEffect } from "react";
import { Share2, User, Mail, MessageSquare, Send } from "lucide-react";
import { Link } from "react-router-dom";
import SocialLinks from "../components/SocialLinks";
import Komentar from "../components/Commentar";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form data
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      Swal.fire({
        title: 'Missing Information',
        text: 'Please fill in all required fields.',
        icon: 'error',
        confirmButtonColor: '#6366f1'
      });
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Show loading message
      Swal.fire({
        title: 'Sending Message...',
        html: 'Please wait while we send your message',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      
      // Create form data
      const form = e.target;
      const formData = new FormData(form);
      
      // Submit to FormSubmit
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        // Show success message
        Swal.fire({
          title: 'Message Sent!',
          text: 'Thank you for your message. I\'ll get back to you soon!',
          icon: 'success',
          confirmButtonColor: '#6366f1',
          timer: 3000,
          timerProgressBar: true
        });
        
        // Reset form
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      Swal.fire({
        title: 'Error',
        text: 'There was an error sending your message. Please try again or contact me directly.',
        icon: 'error',
        confirmButtonColor: '#6366f1'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="text-center pt-8 sm:pt-12 md:pt-16 lg:pt-[5%] mb-6 sm:mb-8 md:mb-10 px-4 xs:px-5 sm:px-6 md:px-0">
        <h2
          data-aos="fade-down"
          data-aos-duration="1000"
          className="inline-block text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
        >
          <span
            style={{
              color: "#6366f1",
              backgroundImage:
                "linear-gradient(45deg, #6366f1 10%, #a855f7 93%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Contact Me
          </span>
        </h2>
        <p
          data-aos="fade-up"
          data-aos-duration="1100"
          className="text-slate-400 max-w-2xl mx-auto text-xs xs:text-sm sm:text-base mt-2 px-2"
        >
          Got a question? Send me a message, and I'll get back to you soon.
        </p>
      </div>

      <div
        className="h-auto py-6 sm:py-8 md:py-10 flex items-center justify-center px-4 xs:px-5 sm:px-6 md:px-8 lg:px-0"
        id="Contact"
      >
        <div className="container px-0 sm:px-[1%] grid grid-cols-1 lg:grid-cols-[45%_55%] 2xl:grid-cols-[35%_65%] gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          <div
            data-aos="fade-right"
            data-aos-duration="1200"
            className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-4 xs:p-5 sm:p-6 md:p-8 lg:p-10 py-6 xs:py-8 sm:py-10 transform transition-all duration-300 hover:shadow-[#6366f1]/10"
          >
            <div className="flex justify-between items-start mb-6 sm:mb-8">
              <div className="flex-1">
                <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                  Get in Touch
                </h2>
                <p className="text-gray-400 text-xs xs:text-sm sm:text-base pr-2">
                  Have something to discuss? Send me a message and let's talk.
                </p>
              </div>
              <Share2 className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 text-[#6366f1] opacity-50 flex-shrink-0" />
            </div>

            <form 
              action="https://formsubmit.co/hhijazi@appifylabs.pro"
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* FormSubmit Configuration */}
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="https://hhijazi.vercel.app/thank-you" />
              <input type="hidden" name="_subject" value="New Contact Form Submission from Portfolio!" />
              <input type="hidden" name="_autoresponse" value="Thank you for contacting me! I'll get back to you soon." />

              <div
                data-aos="fade-up"
                data-aos-delay="100"
                className="relative group"
              >
                <User className="absolute left-3 xs:left-4 top-3 xs:top-4 w-4 h-4 xs:w-5 xs:h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-3 xs:p-4 pl-10 xs:pl-12 bg-white/10 rounded-lg xs:rounded-xl border border-white/20 placeholder-gray-500 text-white text-sm xs:text-base focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 disabled:opacity-50 min-h-touch"
                  required
                />
              </div>
              <div
                data-aos="fade-up"
                data-aos-delay="200"
                className="relative group"
              >
                <Mail className="absolute left-3 xs:left-4 top-3 xs:top-4 w-4 h-4 xs:w-5 xs:h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-3 xs:p-4 pl-10 xs:pl-12 bg-white/10 rounded-lg xs:rounded-xl border border-white/20 placeholder-gray-500 text-white text-sm xs:text-base focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 disabled:opacity-50 min-h-touch"
                  required
                />
              </div>
              <div
                data-aos="fade-up"
                data-aos-delay="300"
                className="relative group"
              >
                <MessageSquare className="absolute left-3 xs:left-4 top-3 xs:top-4 w-4 h-4 xs:w-5 xs:h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full resize-none p-3 xs:p-4 pl-10 xs:pl-12 bg-white/10 rounded-lg xs:rounded-xl border border-white/20 placeholder-gray-500 text-white text-sm xs:text-base focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 h-24 xs:h-28 sm:h-32 md:h-[9.9rem] disabled:opacity-50"
                  required
                />
              </div>
              <button
                data-aos="fade-up"
                data-aos-delay="400"
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white py-3 xs:py-4 rounded-lg xs:rounded-xl font-semibold text-sm xs:text-base transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#6366f1]/20 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 min-h-touch"
              >
                <Send className="w-4 h-4 xs:w-5 xs:h-5" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            <div className="mt-10 pt-6 border-t border-white/10 flex justify-center space-x-6">
              <SocialLinks />
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-3 xs:p-4 sm:p-6 md:p-8 lg:p-10 py-4 xs:py-5 sm:py-6 md:py-8 shadow-2xl transform transition-all duration-300 hover:shadow-[#6366f1]/10">
            <Komentar />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;