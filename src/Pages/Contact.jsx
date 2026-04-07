import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Share2, User, Mail, MessageSquare, Send, FileText } from 'lucide-react';
import SocialLinks from '../components/ui/SocialLinks';
import Komentar from '../components/Commentar';
import Swal from 'sweetalert2';
import GlassCard from '../components/ui/GlassCard';
import GradientText from '../components/ui/GradientText';
import MagneticButton from '../components/animations/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const commentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%', once: true },
      });
      gsap.fromTo(formRef.current, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, delay: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: formRef.current, start: 'top 85%', once: true },
      });
      gsap.fromTo(commentRef.current, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: 'power3.out',
        scrollTrigger: { trigger: commentRef.current, start: 'top 85%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      Swal.fire({ title: 'Missing Information', text: 'Please fill in all fields.', icon: 'error', confirmButtonColor: '#6C63FF', background: '#12121A', color: '#FAFAFA' });
      setIsSubmitting(false);
      return;
    }

    try {
      Swal.fire({ title: 'Sending...', html: 'Delivering your message', allowOutsideClick: false, background: '#12121A', color: '#FAFAFA', didOpen: () => Swal.showLoading() });
      const form = e.target;
      const fd = new FormData(form);
      const res = await fetch(form.action, { method: 'POST', body: fd });
      if (res.ok) {
        Swal.fire({ title: 'Sent!', text: 'Thanks for reaching out. I\'ll reply soon.', icon: 'success', confirmButtonColor: '#6C63FF', timer: 3000, timerProgressBar: true, background: '#12121A', color: '#FAFAFA' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed');
      }
    } catch {
      Swal.fire({ title: 'Error', text: 'Something went wrong. Please try again.', icon: 'error', confirmButtonColor: '#6C63FF', background: '#12121A', color: '#FAFAFA' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = 'w-full p-3.5 pl-11 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-white placeholder-[#8B8B9E] text-sm focus:outline-none focus:border-[rgba(108,99,255,0.4)] focus:shadow-[0_0_20px_rgba(108,99,255,0.08)] transition-all duration-300';
  const iconClasses = 'absolute left-3.5 top-3.5 w-4 h-4 text-[#8B8B9E] group-focus-within:text-[#6C63FF] transition-colors duration-300';

  return (
    <section ref={sectionRef} id="Contact" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-12" style={{ opacity: 0 }}>
          <p className="text-sm uppercase tracking-[0.2em] text-[#6C63FF] mb-3 font-medium">Contact</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <GradientText animate>Get In Touch</GradientText>
          </h2>
          <p className="mt-4 text-[#8B8B9E] max-w-lg mx-auto">
            Have a project in mind or just want to say hello? I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 lg:gap-12">

          {/* Left: Form + Social */}
          <div ref={formRef} style={{ opacity: 0 }}>
            <GlassCard className="p-6 sm:p-8">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">Send a Message</h3>
                  <p className="text-sm text-[#8B8B9E]">I'll get back to you as soon as possible.</p>
                </div>
                <Share2 className="w-5 h-5 text-[#6C63FF] opacity-40" />
              </div>

              <form
                action="https://formsubmit.co/hhijazi@appifylabs.pro"
                method="POST"
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_next" value="https://hhijazi.vercel.app/thank-you" />
                <input type="hidden" name="_subject" value="New Contact Form Submission from Portfolio!" />
                <input type="hidden" name="_autoresponse" value="Thank you for contacting me! I'll get back to you soon." />

                <div className="relative group">
                  <User className={iconClasses} />
                  <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} disabled={isSubmitting} className={inputClasses} required />
                </div>
                <div className="relative group">
                  <Mail className={iconClasses} />
                  <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} disabled={isSubmitting} className={inputClasses} required />
                </div>
                <div className="relative group">
                  <MessageSquare className={iconClasses} />
                  <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} disabled={isSubmitting} className={`${inputClasses} resize-none h-28`} required />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(108,99,255,0.25)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #6C63FF, #00D4FF)' }}
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>

              {/* Download CV */}
              <div className="mt-6 flex justify-center">
                <MagneticButton
                  as="a"
                  href="/CV-final.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="CV-final.pdf"
                  strength={0.2}
                >
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-[rgba(108,99,255,0.25)] text-white hover:bg-[rgba(108,99,255,0.08)] hover:border-[rgba(108,99,255,0.5)] transition-all duration-300">
                    <FileText className="w-4 h-4" />
                    Download CV
                  </span>
                </MagneticButton>
              </div>

              {/* Social links */}
              <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.04)]">
                <SocialLinks />
              </div>
            </GlassCard>
          </div>

          {/* Right: Comments */}
          <div ref={commentRef} style={{ opacity: 0 }}>
            <GlassCard className="p-6 sm:p-8 h-full">
              <Komentar />
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
