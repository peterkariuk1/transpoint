import { useState, useRef, useEffect } from "react";
import "../styles/Upload.css";
import { FiPlus, FiCheckCircle } from "react-icons/fi";
import { BiImageAdd } from "react-icons/bi";
import { MdOutlineInventory2, MdOutlineSell, MdVideoLibrary } from "react-icons/md";
import { db } from "../../firebase/firebaseConfig";
import { collection, addDoc, getDocs, query, where, Timestamp } from "firebase/firestore";
import axios from "axios";

const BACKEND_URL = "https://loriskenya-backend-production.up.railway.app/api";

const UploadCatalogue = () => {
    // Form state
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        available: true,
        propertyType: "sale", // Add default property type (sale or rental)
        images: [],
        videos: [],
    });

    // UI state
    const [imagePreviewList, setImagePreviewList] = useState([]);
    const [videoPreviewList, setVideoPreviewList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [uploadSuccess, setUploadSuccess] = useState(false);

    // Refs
    const fileInputRef = useRef(null);
    const videoInputRef = useRef(null);

    // Fetch property stats from Firestore
    useEffect(() => {
        const fetchPropertyStats = async () => {
            try {
                const propertiesRef = collection(db, "property");
                const propertiesSnapshot = await getDocs(propertiesRef);

                const availableQuery = query(propertiesRef, where("available", "==", true));
                const availableSnapshot = await getDocs(availableQuery);
            } catch (error) {
                console.error("Error fetching property stats:", error);
            }
        };

        fetchPropertyStats();
    }, [uploadSuccess]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    // Handle radio button changes
    const handleRadioChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle multiple image selection
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const validFiles = [];
        const invalidFiles = [];
        const newPreviews = [];

        files.forEach(file => {
            if (file.size > 5 * 1024 * 1024) {
                invalidFiles.push(`${file.name} (exceeds 5MB size limit)`);
                return;
            }

            if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
                invalidFiles.push(`${file.name} (invalid format)`);
                return;
            }

            validFiles.push(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                newPreviews.push({
                    id: Math.random().toString(36).substr(2, 9),
                    name: file.name,
                    url: reader.result
                });

                if (newPreviews.length === validFiles.length) {
                    setImagePreviewList(prev => [...prev, ...newPreviews]);
                }
            };
            reader.readAsDataURL(file);
        });

        setFormData(prev => ({
            ...prev,
            images: [...prev.images, ...validFiles]
        }));

        if (invalidFiles.length > 0) {
            setFormErrors(prev => ({
                ...prev,
                images: `Issues with: ${invalidFiles.join(', ')}`
            }));
        } else {
            setFormErrors(prev => ({
                ...prev,
                images: null
            }));
        }
    };

    // Handle multiple video selection
    const handleVideoChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const validFiles = [];
        const invalidFiles = [];
        const newPreviews = [];

        files.forEach(file => {
            if (file.size > 250 * 1024 * 1024) {
                invalidFiles.push(`${file.name} (exceeds 250MB size limit)`);
                return;
            }

            if (!['video/mp4', 'video/webm', 'video/quicktime'].includes(file.type)) {
                invalidFiles.push(`${file.name} (invalid format)`);
                return;
            }

            validFiles.push(file);

            const url = URL.createObjectURL(file);
            newPreviews.push({
                id: Math.random().toString(36).substr(2, 9),
                name: file.name,
                url: url
            });
        });

        setFormData(prev => ({
            ...prev,
            videos: [...prev.videos, ...validFiles]
        }));

        setVideoPreviewList(prev => [...prev, ...newPreviews]);

        if (invalidFiles.length > 0) {
            setFormErrors(prev => ({
                ...prev,
                videos: `Issues with: ${invalidFiles.join(', ')}`
            }));
        } else {
            setFormErrors(prev => ({
                ...prev,
                videos: null
            }));
        }
    };

    // Function to remove an image from the list
    const removeImage = (id) => {
        const imageIndex = imagePreviewList.findIndex(img => img.id === id);
        if (imageIndex === -1) return;

        const newPreviews = imagePreviewList.filter(img => img.id !== id);
        const newImages = [...formData.images];
        newImages.splice(imageIndex, 1);

        setImagePreviewList(newPreviews);
        setFormData(prev => ({
            ...prev,
            images: newImages
        }));
    };

    // Function to remove a video from the list
    const removeVideo = (id) => {
        const videoIndex = videoPreviewList.findIndex(vid => vid.id === id);
        if (videoIndex === -1) return;

        const newPreviews = videoPreviewList.filter(vid => vid.id !== id);
        const newVideos = [...formData.videos];
        newVideos.splice(videoIndex, 1);

        URL.revokeObjectURL(videoPreviewList[videoIndex].url);

        setVideoPreviewList(newPreviews);
        setFormData(prev => ({
            ...prev,
            videos: newVideos
        }));
    };

    // Validate form
    const validateForm = () => {
        const errors = {};

        if (!formData.name.trim()) errors.name = "Property name is required";
        if (!formData.price || formData.price <= 0) errors.price = "Valid price is required";
        if (!formData.description.trim()) errors.description = "Description is required";
        if (formData.images.length === 0) errors.images = "At least one property image is required";

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (!validateForm()) {
            const firstError = document.querySelector('.error-message');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        setShowConfirmation(true);
    };

    // Cancel confirmation
    const handleCancel = () => {
        setShowConfirmation(false);
    };

    // Upload media to B2 through the backend API
    const uploadMediaToB2 = async (file, fileType) => {
        const formData = new FormData();
        formData.append(fileType, file);
        formData.append('category', 'properties');

        const axiosInstance = axios.create();

        const response = await axiosInstance.post(
            `${BACKEND_URL}/storage/upload`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                }
            }
        );

        return response.data;
    };

    // Process upload after confirmation
    const handleConfirmedUpload = async () => {
        setUploading(true);
        setUploadProgress(0);
        setShowConfirmation(false);

        try {
            // 1. Upload images to Backblaze B2 via backend API
            const imageUrls = [];
            const imageFileNames = [];

            // Upload each image sequentially
            for (let i = 0; i < formData.images.length; i++) {
                setUploadProgress((i / formData.images.length) * 50); // First 50% of progress for images

                const imageUploadResult = await uploadMediaToB2(formData.images[i], 'image');

                if (!imageUploadResult.success) {
                    throw new Error(imageUploadResult.message || "Failed to upload image");
                }

                imageUrls.push(imageUploadResult.data.fileUrl);
                imageFileNames.push(imageUploadResult.data.fileName);
            }

            // 2. Upload videos if available
            const videoUrls = [];
            const videoFileNames = [];

            if (formData.videos.length > 0) {
                // Upload each video sequentially
                for (let i = 0; i < formData.videos.length; i++) {
                    // Start progress from 50% and continue to 100%
                    setUploadProgress(50 + ((i / formData.videos.length) * 50));

                    const videoUploadResult = await uploadMediaToB2(formData.videos[i], 'video');

                    if (!videoUploadResult.success) {
                        throw new Error(videoUploadResult.message || "Failed to upload video");
                    }

                    videoUrls.push(videoUploadResult.data.fileUrl);
                    videoFileNames.push(videoUploadResult.data.fileName);
                }
            }

            // 3. Add property to Firestore with media URLs
            const propertyData = {
                name: formData.name,
                price: parseFloat(formData.price),
                description: formData.description,
                available: formData.available,
                propertyType: formData.propertyType, // Add property type
                images: imageUrls,
                imageFileNames: imageFileNames,
                videos: videoUrls.length > 0 ? videoUrls : null,
                videoFileNames: videoFileNames.length > 0 ? videoFileNames : null,
                createdAt: Timestamp.now()
            };

            await addDoc(collection(db, "property"), propertyData);

            // Success!
            setUploadProgress(100);
            setUploading(false);
            setUploadSuccess(true);

            // Reset form after 2 seconds
            setTimeout(() => {
                resetForm();
                setUploadSuccess(false);
            }, 2000);

        } catch (error) {
            console.error("Upload error:", error);
            setFormErrors(prev => ({
                ...prev,
                upload: error.message || "Upload failed"
            }));
            setUploading(false);
        }
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            name: "",
            price: "",
            description: "",
            available: true,
            propertyType: "sale", // Reset to default
            images: [],
            videos: []
        });

        // Revoke all video URLs to prevent memory leaks
        videoPreviewList.forEach(video => {
            URL.revokeObjectURL(video.url);
        });

        setImagePreviewList([]);
        setVideoPreviewList([]);
        setFormErrors({});

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        if (videoInputRef.current) {
            videoInputRef.current.value = "";
        }
    };

    return (
        <div className="admin-upload-container">
            <div className="admin-header">
                <div className="admin-title">
                    <h1>Property Management</h1>
                    <p>Add new properties to your inventory</p>
                </div>
            </div>

            <div className="upload-form-container">
                <h2>Add New Property</h2>
                <div className="upload-form">
                    <div className="form-grid">
                        <div className="form-section">
                            <h3>Media</h3>
                            <div className="form-section image-upload-section">
                                <h4>Property Images</h4>
                                <div 
                                    className={`image-upload-area ${formErrors.images ? 'error' : ''}`}
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    {imagePreviewList.length > 0 ? (
                                        <div className="image-previews-grid">
                                            {imagePreviewList.map(img => (
                                                <div key={img.id} className="image-preview-item">
                                                    <img src={img.url} alt={img.name} className="image-preview" />
                                                    <button 
                                                        className="remove-file-btn"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            removeImage(img.id);
                                                        }}
                                                    >
                                                        ×
                                                    </button>
                                                    <div className="file-name">{img.name}</div>
                                                </div>
                                            ))}
                                            <div className="add-more-placeholder">
                                                <FiPlus className="add-icon" />
                                                <span>Add More</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="upload-placeholder">
                                            <BiImageAdd className="upload-icon" />
                                            <p>Click to upload property images</p>
                                            <span>JPEG, PNG or WEBP, max 5MB each</span>
                                        </div>
                                    )}
                                    <input 
                                        type="file" 
                                        ref={fileInputRef}
                                        onChange={handleImageChange}
                                        accept="image/jpeg,image/png,image/webp"
                                        className="hidden-input"
                                        multiple
                                    />
                                </div>
                                {formErrors.images && <div className="error-message">{formErrors.images}</div>}
                            </div>

                            <div className="form-section video-upload-section">
                                <h4>Property Videos (Optional)</h4>
                                <div 
                                    className={`video-upload-area ${formErrors.videos ? 'error' : ''}`}
                                    onClick={() => videoInputRef.current.click()}
                                >
                                    {videoPreviewList.length > 0 ? (
                                        <div className="video-previews-grid">
                                            {videoPreviewList.map(vid => (
                                                <div key={vid.id} className="video-preview-item">
                                                    <video 
                                                        src={vid.url} 
                                                        className="video-preview" 
                                                        controls
                                                    />
                                                    <button 
                                                        className="remove-file-btn"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            removeVideo(vid.id);
                                                        }}
                                                    >
                                                        ×
                                                    </button>
                                                    <div className="file-name">{vid.name}</div>
                                                </div>
                                            ))}
                                            <div className="add-more-placeholder">
                                                <FiPlus className="add-icon" />
                                                <span>Add More</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="upload-placeholder">
                                            <MdVideoLibrary className="upload-icon" />
                                            <p>Click to upload property videos</p>
                                            <span>MP4, WebM or MOV, max 250MB each</span>
                                        </div>
                                    )}
                                    <input 
                                        type="file" 
                                        ref={videoInputRef}
                                        onChange={handleVideoChange}
                                        accept="video/mp4,video/webm,video/quicktime"
                                        className="hidden-input"
                                        multiple
                                    />
                                </div>
                                {formErrors.videos && <div className="error-message">{formErrors.videos}</div>}
                            </div>
                        </div>

                        <div className="form-section">
                            <h3>Property Information</h3>

                            <div className="form-group">
                                <label htmlFor="name">Property Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Luxury Apartment in Karen"
                                    className={formErrors.name ? 'error' : ''}
                                />
                                {formErrors.name && <div className="error-message">{formErrors.name}</div>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="price">Price (KSh)</label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="e.g. 15000000"
                                    className={formErrors.price ? 'error' : ''}
                                />
                                {formErrors.price && <div className="error-message">{formErrors.price}</div>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Property Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Describe the property features, location, amenities, etc."
                                    rows="6"
                                    className={formErrors.description ? 'error' : ''}
                                ></textarea>
                                {formErrors.description && <div className="error-message">{formErrors.description}</div>}
                            </div>

                            {/* Add Property Type Selection */}
                            <div className="attribute-section">
                                <div className="attribute-header">
                                    <MdOutlineSell className="attribute-icon" />
                                    <label>Property Type</label>
                                </div>
                                <div className="radio-group">
                                    <div 
                                        className={`radio-button ${formData.propertyType === 'sale' ? 'active' : ''}`}
                                        onClick={() => handleRadioChange('propertyType', 'sale')}
                                    >
                                        <div className="radio-dot"></div>
                                        <span>For Sale</span>
                                    </div>
                                    <div 
                                        className={`radio-button ${formData.propertyType === 'rental' ? 'active' : ''}`}
                                        onClick={() => handleRadioChange('propertyType', 'rental')}
                                    >
                                        <div className="radio-dot"></div>
                                        <span>Rental</span>
                                    </div>
                                </div>
                            </div>

                            <div className="attribute-section">
                                <div className="attribute-header">
                                    <MdOutlineInventory2 className="attribute-icon" />
                                    <label>Availability</label>
                                </div>
                                <div className="radio-group">
                                    <div
                                        className={`radio-button ${formData.available ? 'active' : ''}`}
                                        onClick={() => handleRadioChange('available', true)}
                                    >
                                        <div className="radio-dot"></div>
                                        <span>Available</span>
                                    </div>
                                    <div
                                        className={`radio-button ${!formData.available ? 'active' : ''}`}
                                        onClick={() => handleRadioChange('available', false)}
                                    >
                                        <div className="radio-dot"></div>
                                        <span>Not Available</span>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div className="form-actions">
                    {formErrors.upload && <div className="error-message upload-error">{formErrors.upload}</div>}

                    {uploading ? (
                        <div className="upload-progress">
                            <div className="progress-bar-container">
                                <div
                                    className="progress-bar-fill"
                                    style={{ width: `${uploadProgress}%` }}
                                ></div>
                            </div>
                            <span className="progress-text">{Math.round(uploadProgress)}% Uploading media...</span>
                        </div>
                    ) : uploadSuccess ? (
                        <div className="upload-success">
                            <FiCheckCircle className="success-icon" />
                            <span>Property uploaded successfully!</span>
                        </div>
                    ) : (
                        <button
                            className="submit-button"
                            onClick={handleSubmit}
                            disabled={uploading}
                        >
                            <FiPlus className="button-icon" />
                            Add Property
                        </button>
                    )}
                </div>
            </div>

            {showConfirmation && (
                <div className="confirmation-modal">
                    <div className="confirmation-content">
                        <h3>Confirm Property Upload</h3>
                        <p>Once submitted, changes can't be made unless you delete the entire property listing. Are you sure you want to proceed?</p>
                        <div className="confirmation-actions">
                            <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                            <button className="confirm-button" onClick={handleConfirmedUpload}>Yes, Upload Property</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadCatalogue;