import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { getDocs, addDoc, collection, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase-comment';
import { MessageCircle, UserCircle2, Loader2, AlertCircle, Send, ImagePlus, X } from 'lucide-react';

const Comment = memo(({ comment, formatDate }) => (
  <div className="px-4 pt-4 pb-3 rounded-xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(108,99,255,0.15)] transition-all duration-300 group">
    <div className="flex items-start gap-3">
      {comment.profileImage ? (
        <img
          src={comment.profileImage}
          alt={`${comment.userName}'s profile`}
          className="w-9 h-9 rounded-full object-cover border border-[rgba(108,99,255,0.3)]"
          loading="lazy"
        />
      ) : (
        <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[rgba(108,99,255,0.1)]">
          <UserCircle2 className="w-4 h-4 text-[#6C63FF]" />
        </div>
      )}
      <div className="flex-grow min-w-0">
        <div className="flex items-center justify-between gap-3 mb-1">
          <h4 className="font-medium text-sm text-white truncate">{comment.userName}</h4>
          <span className="text-[10px] text-[#8B8B9E] whitespace-nowrap font-mono">
            {formatDate(comment.createdAt)}
          </span>
        </div>
        <p className="text-[#8B8B9E] text-sm break-words leading-relaxed">{comment.content}</p>
      </div>
    </div>
  </div>
));

const CommentForm = memo(({ onSubmit, isSubmitting, error }) => {
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) return;
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  }, []);

  const handleTextareaChange = useCallback((e) => {
    setNewComment(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!newComment.trim() || !userName.trim()) return;
    onSubmit({ newComment, userName, imageFile });
    setNewComment('');
    setImagePreview(null);
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  }, [newComment, userName, imageFile, onSubmit]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-[#8B8B9E] mb-1.5 uppercase tracking-wider">
          Name <span className="text-[#FF3CAC]">*</span>
        </label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Your name"
          className="w-full p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-white placeholder-[#8B8B9E] text-sm focus:outline-none focus:border-[rgba(108,99,255,0.4)] focus:shadow-[0_0_15px_rgba(108,99,255,0.1)] transition-all duration-300"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-[#8B8B9E] mb-1.5 uppercase tracking-wider">
          Message <span className="text-[#FF3CAC]">*</span>
        </label>
        <textarea
          ref={textareaRef}
          value={newComment}
          onChange={handleTextareaChange}
          placeholder="Write a message..."
          className="w-full p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-white placeholder-[#8B8B9E] text-sm focus:outline-none focus:border-[rgba(108,99,255,0.4)] focus:shadow-[0_0_15px_rgba(108,99,255,0.1)] transition-all duration-300 resize-none min-h-[100px]"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-[#8B8B9E] mb-1.5 uppercase tracking-wider">
          Photo <span className="text-[#8B8B9E]">(optional)</span>
        </label>
        <div className="flex items-center gap-3 p-3 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] rounded-xl">
          {imagePreview ? (
            <div className="flex items-center gap-3">
              <img src={imagePreview} alt="Preview" className="w-12 h-12 rounded-full object-cover border border-[rgba(108,99,255,0.3)]" />
              <button
                type="button"
                onClick={() => { setImagePreview(null); setImageFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-[rgba(255,60,172,0.1)] text-[#FF3CAC] hover:bg-[rgba(255,60,172,0.2)] transition-colors"
              >
                <X className="w-3 h-3" /> Remove
              </button>
            </div>
          ) : (
            <div className="w-full">
              <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs text-[#8B8B9E] border border-dashed border-[rgba(108,99,255,0.2)] hover:border-[rgba(108,99,255,0.5)] hover:text-[#6C63FF] transition-all duration-300"
              >
                <ImagePlus className="w-4 h-4" /> Upload Photo
              </button>
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 rounded-xl font-medium text-sm text-white overflow-hidden transition-all duration-300 hover:shadow-[0_0_25px_rgba(108,99,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        style={{ background: 'linear-gradient(135deg, #6C63FF, #00D4FF)' }}
      >
        {isSubmitting ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Posting...</>
        ) : (
          <><Send className="w-4 h-4" /> Post Comment</>
        )}
      </button>
    </form>
  );
});

const Komentar = () => {
  const [comments, setComments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const commentsRef = collection(db, 'portfolio-comments');
    const q = query(commentsRef, orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snap) => {
      setComments(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  const uploadImage = useCallback(async (imageFile) => {
    if (!imageFile) return null;
    const storageRef = ref(storage, `profile-images/${Date.now()}_${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    return getDownloadURL(storageRef);
  }, []);

  const handleCommentSubmit = useCallback(async ({ newComment, userName, imageFile }) => {
    setError('');
    setIsSubmitting(true);
    try {
      const profileImageUrl = await uploadImage(imageFile);
      await addDoc(collection(db, 'portfolio-comments'), {
        content: newComment,
        userName,
        profileImage: profileImageUrl,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      setError('Failed to post comment. Please try again.');
      console.error('Error adding comment:', err);
    } finally {
      setIsSubmitting(false);
    }
  }, [uploadImage]);

  const formatDate = useCallback((timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    const now = new Date();
    const diffMin = Math.floor((now - date) / 60000);
    const diffHrs = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHrs / 24);
    if (diffMin < 1) return 'Just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHrs < 24) return `${diffHrs}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(108,99,255,0.15), rgba(0,212,255,0.1))' }}>
          <MessageCircle className="w-4 h-4 text-[#6C63FF]" />
        </div>
        <h3 className="text-base font-semibold text-white">
          Comments <span className="text-[#8B8B9E] text-sm font-normal">({comments.length})</span>
        </h3>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 mb-4 text-[#FF3CAC] bg-[rgba(255,60,172,0.06)] border border-[rgba(255,60,172,0.15)] rounded-xl text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <CommentForm onSubmit={handleCommentSubmit} isSubmitting={isSubmitting} error={error} />

      <div className="mt-6 space-y-3 max-h-[320px] overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(108,99,255,0.3) transparent' }}>
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <UserCircle2 className="w-10 h-10 text-[#8B8B9E] mx-auto mb-2 opacity-40" />
            <p className="text-sm text-[#8B8B9E]">No comments yet. Be the first!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <Comment key={comment.id} comment={comment} formatDate={formatDate} />
          ))
        )}
      </div>
    </div>
  );
};

export default Komentar;
