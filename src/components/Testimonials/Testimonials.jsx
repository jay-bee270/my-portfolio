"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Uncomment these when you have the contexts set up
// import { useLanguage } from "../../contexts/LanguageContext";
// import { getTranslation } from "../../utils/translations";
import { db } from "../../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import "./Testimonials.css";

// Temporary translation function - remove when you have the real one
const useLanguage = () => ({ currentLanguage: 'en' });
const getTranslation = (lang, key) => {
  const translations = {
    "testimonials.title": "What Our Users Say",
    "testimonials.subtitle": "Real experiences from our community",
    "testimonials.appUser": "App User",
    "testimonials.cancel": "Cancel",
    "testimonials.shareExperience": "Share Your Experience",
    "testimonials.form.title": "Share Your Experience",
    "testimonials.form.subtitle": "Your feedback helps us improve",
    "testimonials.form.name": "Your Name",
    "testimonials.form.location": "Your Location",
    "testimonials.form.rating": "Rating",
    "testimonials.form.review": "Your Review",
    "testimonials.form.addAvatar": "Add Avatar (Optional)",
    "testimonials.form.chooseAvatar": "Choose Image",
    "testimonials.form.maxImages": "Max 2MB",
    "testimonials.form.submit": "Submit Review",
    "common.loading": "Submitting..."
  };
  return translations[key] || key;
};

const Testimonials = () => {
  const { currentLanguage } = useLanguage();
  const t = (key) => getTranslation(currentLanguage, key);

  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    name: "",
    location: "",
    rating: 5,
    review: "",
    avatar: null,
  });
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Change from clickCounts to hiddenClickCounts for clarity
  const [hiddenClickCounts, setHiddenClickCounts] = useState({});
  const [visibleDeleteButtons, setVisibleDeleteButtons] = useState({});

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "reviews"));
        const reviewsData = [];
        querySnapshot.forEach((docSnap) => {
          reviewsData.push({ id: docSnap.id, ...docSnap.data() });
        });
        reviewsData.sort((a, b) => b.date?.toDate() - a.date?.toDate());
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error loading reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size should be less than 2MB");
        return;
      }
      setSelectedAvatar(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAvatar = () => {
    setSelectedAvatar(null);
    setAvatarPreview(null);
    const fileInput = document.getElementById("review-avatar");
    if (fileInput) fileInput.value = "";
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.location || !newReview.review) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const reviewData = {
        name: newReview.name,
        location: newReview.location,
        rating: newReview.rating,
        review: newReview.review,
        avatar: avatarPreview || null,
        date: new Date(),
        verified: false,
      };

      const docRef = await addDoc(collection(db, "reviews"), reviewData);

      setReviews((prev) => [
        { id: docRef.id, ...reviewData },
        ...prev,
      ]);

      setNewReview({ name: "", location: "", rating: 5, review: "", avatar: null });
      setSelectedAvatar(null);
      setAvatarPreview(null);
      setShowReviewForm(false);

      alert("Thank you for your review!");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("There was an error submitting your review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Create a hidden clickable area for the secret delete functionality
  const handleSecretClick = (id) => {
    const newCount = (hiddenClickCounts[id] || 0) + 1;
    const updatedCounts = {
      ...hiddenClickCounts,
      [id]: newCount,
    };
    setHiddenClickCounts(updatedCounts);

    // Show delete button after 20 clicks (changed from 15)
    if (newCount >= 20) {
      setVisibleDeleteButtons((prev) => ({ ...prev, [id]: true }));
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await deleteDoc(doc(db, "reviews", reviewId));
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
      
      // Reset the counts for this review
      setHiddenClickCounts((prev) => {
        const newCounts = { ...prev };
        delete newCounts[reviewId];
        return newCounts;
      });
      setVisibleDeleteButtons((prev) => {
        const newButtons = { ...prev };
        delete newButtons[reviewId];
        return newButtons;
      });
      
      alert("Review deleted successfully.");
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete review. Please try again.");
    }
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToReview = (index) => {
    setCurrentIndex(index);
  };

  if (isLoading) {
    return (
      <section id="testimonials" className="section testimonials">
        <div className="container">
          <div className="loading-spinner"> </div>
        </div>
      </section>
    );
  }

  const currentReview = reviews[currentIndex];

  return (
    <section id="testimonials" className="section testimonials visible">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">{t("testimonials.title")}</h2>
          <p className="section-subtitle">{t("testimonials.subtitle")}</p>
        </motion.div>

        {reviews.length > 0 && (
          <div className="testimonials-container">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="testimonial-card"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                // Removed the onClick from the card itself
              >
                {/* Add a hidden clickable overlay for the secret functionality */}
                <div 
                  className="secret-click-overlay"
                  onClick={() => handleSecretClick(currentReview.id)}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: visibleDeleteButtons[currentReview.id] ? 'calc(100% - 60px)' : '100%', // Leave space for delete button
                    cursor: 'pointer',
                    opacity: 0, // Invisible but still clickable
                    zIndex: 1
                  }}
                  aria-hidden="true"
                />
                
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < currentReview.rating ? "star filled" : "star"}>
                      ⭐
                    </span>
                  ))}
                </div>

                <p className="testimonial-text">"{currentReview.review}"</p>

                <div className="testimonial-author">
                  <img
                    src={currentReview.avatar || "/placeholder.jpg"}
                    alt={currentReview.name}
                    className="author-avatar"
                    onError={(e) => {
                      e.target.src = "/placeholder.jpg";
                    }}
                  />
                  <div className="author-info">
                    <h4>
                      {currentReview.name}
                      {currentReview.verified && <span className="verified-badge"> ✓</span>}
                    </h4>
                    <p>{currentReview.location}</p>
                    <p className="review-date">
                      {currentReview.date?.toDate?.()?.toLocaleDateString() || "Recent"}
                    </p>
                  </div>
                </div>

                {visibleDeleteButtons[currentReview.id] && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDeleteReview(currentReview.id);
                    }}
                    className="delete-button"
                    style={{
                      marginTop: '20px',
                      backgroundColor: '#ff4444',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      position: 'relative',
                      zIndex: 2 // Higher z-index than the overlay
                    }}
                  >
                    Delete Review
                  </button>
                )}
              </motion.div>
            </AnimatePresence>

            {reviews.length > 1 && (
              <div className="testimonial-controls">
                <button className="control-btn" onClick={prevReview} aria-label="Previous review">
                  ←
                </button>

                <div className="testimonial-dots">
                  {reviews.map((_, index) => (
                    <button
                      key={index}
                      className={`dot ${index === currentIndex ? "active" : ""}`}
                      onClick={() => goToReview(index)}
                      aria-label={`Go to review ${index + 1}`}
                    />
                  ))}
                </div>

                <button className="control-btn" onClick={nextReview} aria-label="Next review">
                  →
                </button>
              </div>
            )}
          </div>
        )}

        <motion.div
          className="review-actions"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="btn btn-outline"
            onClick={() => setShowReviewForm(!showReviewForm)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showReviewForm ? t("testimonials.cancel") : t("testimonials.shareExperience")}
          </motion.button>
        </motion.div>

        {showReviewForm && (
          <motion.div
            className="review-form-container"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <form className="review-form" onSubmit={handleSubmitReview}>
              <h3>{t("testimonials.form.title")}</h3>
              <p>{t("testimonials.form.subtitle")}</p>

              <div className="form-row">
                <input
                  type="text"
                  placeholder={t("testimonials.form.name")}
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder={t("testimonials.form.location")}
                  value={newReview.location}
                  onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                  required
                />
              </div>

              <div className="rating-input">
                <label>{t("testimonials.form.rating")}</label>
                <div className="stars-input">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      type="button"
                      className={`star-btn ${star <= newReview.rating ? "active" : ""}`}
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      ⭐
                    </motion.button>
                  ))}
                </div>
              </div>

              <textarea
                placeholder={t("testimonials.form.review")}
                value={newReview.review}
                onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
                required
                rows="4"
              />

              <div className="avatar-upload-section">
                <label>{t("testimonials.form.addAvatar")}</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="avatar-input"
                  id="review-avatar"
                />
                <label htmlFor="review-avatar" className="image-upload-btn">
                  {t("testimonials.form.chooseAvatar")}
                </label>
                <p className="image-limit">{t("testimonials.form.maxImages")}</p>

                {avatarPreview && (
                  <div className="image-preview">
                    <img src={avatarPreview} alt="Preview" />
                    <button type="button" className="remove-image-btn" onClick={removeAvatar}>
                      ❌
                    </button>
                  </div>
                )}
              </div>

              <motion.button
                type="submit"
                className="btn submit-btn"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? t("common.loading") : t("testimonials.form.submit")}
              </motion.button>
            </form>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;