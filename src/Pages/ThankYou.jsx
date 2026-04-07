import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import GradientText from '../components/ui/GradientText';
import MagneticButton from '../components/animations/MagneticButton';

const ThankYouPage = () => (
  <div className="min-h-screen flex items-center justify-center px-6 bg-[#0A0A0F]">
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <motion.div
        className="flex justify-center mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
      >
        <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(108,99,255,0.15), rgba(0,212,255,0.1))' }}>
          <CheckCircle className="w-10 h-10 text-[#00F5D4]" />
        </div>
      </motion.div>
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        <GradientText animate>Thank You!</GradientText>
      </h1>
      <p className="text-[#8B8B9E] text-lg mb-8 max-w-md mx-auto">
        Your message has been received. I'll get back to you as soon as possible.
      </p>
      <MagneticButton as={Link} to="/" strength={0.2}>
        <span
          className="inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(108,99,255,0.25)]"
          style={{ background: 'linear-gradient(135deg, #6C63FF, #00D4FF)' }}
        >
          Back to Home
        </span>
      </MagneticButton>
    </motion.div>
  </div>
);

export default ThankYouPage;
