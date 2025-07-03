import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const PersonalInfoSection = ({ isActive, onSave, onCancel, hasUnsavedChanges, setHasUnsavedChanges }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@company.com',
    phone: '+1 (555) 123-4567',
    jobTitle: 'Senior Sales Representative',
    department: 'Sales',
    profilePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  });
  const [originalData, setOriginalData] = useState({});
  const [errors, setErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  const languages = {
    en: {
      personalInfo: 'Personal Information',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      phone: 'Phone Number',
      jobTitle: 'Job Title',
      department: 'Department',
      profilePhoto: 'Profile Photo',
      uploadPhoto: 'Upload Photo',
      removePhoto: 'Remove Photo',
      save: 'Save Changes',
      cancel: 'Cancel',
      required: 'This field is required',
      invalidEmail: 'Please enter a valid email address',
      invalidPhone: 'Please enter a valid phone number',
      photoUploaded: 'Profile photo updated successfully',
      changesSaved: 'Personal information saved successfully'
    },
    es: {
      personalInfo: 'Información Personal',
      firstName: 'Nombre',
      lastName: 'Apellido',
      email: 'Correo Electrónico',
      phone: 'Número de Teléfono',
      jobTitle: 'Título del Trabajo',
      department: 'Departamento',
      profilePhoto: 'Foto de Perfil',
      uploadPhoto: 'Subir Foto',
      removePhoto: 'Eliminar Foto',
      save: 'Guardar Cambios',
      cancel: 'Cancelar',
      required: 'Este campo es obligatorio',
      invalidEmail: 'Por favor ingrese un correo electrónico válido',
      invalidPhone: 'Por favor ingrese un número de teléfono válido',
      photoUploaded: 'Foto de perfil actualizada exitosamente',
      changesSaved: 'Información personal guardada exitosamente'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    setOriginalData({ ...formData });
  }, []);

  useEffect(() => {
    const hasChanges = JSON.stringify(formData) !== JSON.stringify(originalData);
    setHasUnsavedChanges(hasChanges);
  }, [formData, originalData, setHasUnsavedChanges]);

  const validateField = (name, value) => {
    switch (name) {
      case 'firstName': case'lastName':
        return value.trim() === '' ? t.required : '';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? t.invalidEmail : '';
      case 'phone':
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return value && !phoneRegex.test(value.replace(/[\s\-\(\)]/g, '')) ? t.invalidPhone : '';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      // Simulate upload delay
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = (event) => {
          setFormData(prev => ({ ...prev, profilePhoto: event.target.result }));
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
      }, 1500);
    }
  };

  const handleRemovePhoto = () => {
    setFormData(prev => ({ ...prev, profilePhoto: '' }));
  };

  const handleSave = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length === 0) {
      setOriginalData({ ...formData });
      onSave(formData);
    } else {
      setErrors(newErrors);
    }
  };

  const handleCancel = () => {
    setFormData({ ...originalData });
    setErrors({});
    onCancel();
  };

  const t = languages[currentLanguage];

  if (!isActive) return null;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary font-heading mb-2">
          {t.personalInfo}
        </h3>
        <p className="text-sm text-text-secondary font-caption">
          Update your personal information and profile details.
        </p>
      </div>

      {/* Profile Photo Section */}
      <div className="bg-surface-secondary rounded-lg p-6 border border-border">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-secondary-100 border-2 border-border">
              {formData.profilePhoto ? (
                <Image
                  src={formData.profilePhoto}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Icon name="User" size={32} className="text-secondary-400" />
                </div>
              )}
            </div>
            {isUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                <Icon name="Loader2" size={20} className="text-white animate-spin" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h4 className="text-sm font-medium text-text-primary font-body mb-2">
              {t.profilePhoto}
            </h4>
            <div className="flex flex-wrap gap-2">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  disabled={isUploading}
                />
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Upload"
                  iconPosition="left"
                  disabled={isUploading}
                  className="pointer-events-none"
                >
                  {t.uploadPhoto}
                </Button>
              </label>
              {formData.profilePhoto && (
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Trash2"
                  iconPosition="left"
                  onClick={handleRemovePhoto}
                  disabled={isUploading}
                >
                  {t.removePhoto}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-text-primary font-body mb-2">
            {t.firstName} *
          </label>
          <Input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder={t.firstName}
            required
            className={errors.firstName ? 'border-error' : ''}
          />
          {errors.firstName && (
            <p className="mt-1 text-xs text-error font-caption">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary font-body mb-2">
            {t.lastName} *
          </label>
          <Input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder={t.lastName}
            required
            className={errors.lastName ? 'border-error' : ''}
          />
          {errors.lastName && (
            <p className="mt-1 text-xs text-error font-caption">{errors.lastName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary font-body mb-2">
            {t.email} *
          </label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder={t.email}
            required
            className={errors.email ? 'border-error' : ''}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-error font-caption">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary font-body mb-2">
            {t.phone}
          </label>
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder={t.phone}
            className={errors.phone ? 'border-error' : ''}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-error font-caption">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary font-body mb-2">
            {t.jobTitle}
          </label>
          <Input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            placeholder={t.jobTitle}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary font-body mb-2">
            {t.department}
          </label>
          <Input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            placeholder={t.department}
          />
        </div>
      </div>

      {/* Action Buttons */}
      {hasUnsavedChanges && (
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <Button
            variant="primary"
            onClick={handleSave}
            iconName="Save"
            iconPosition="left"
            className="sm:w-auto"
          >
            {t.save}
          </Button>
          <Button
            variant="outline"
            onClick={handleCancel}
            iconName="X"
            iconPosition="left"
            className="sm:w-auto"
          >
            {t.cancel}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PersonalInfoSection;