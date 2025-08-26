import React, { useState } from 'react';
import { useOrders } from '../context/OrderContext';
import { OrderFormData } from '../types/Order';

const OrderForm: React.FC = () => {
  const { addOrder } = useOrders();
  const [formData, setFormData] = useState<OrderFormData>({
    fileFormat: '',
    size: '',
    turnaroundTime: '',
    complexity: '',
    additionalDetails: '',
    designFile: null,
    email: '',
    phone: ''
  });

  const [showContactForm, setShowContactForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      designFile: file
    }));
  };

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.fileFormat || !formData.size || !formData.turnaroundTime || !formData.complexity) {
      alert('Please fill in all required fields');
      return;
    }

    // Show success notification and contact form
    setShowContactForm(true);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.phone) {
      alert('Please provide your email and phone number');
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Integrate with Firebase here
      // const orderData = {
      //   ...formData,
      //   timestamp: new Date(),
      //   status: 'pending'
      // };
      // await saveToFirebase(orderData);

      console.log('Order data to be saved:', formData);
      
      // Add order to context
      addOrder({
        customerName: formData.email.split('@')[0], // Extract name from email for demo
        email: formData.email,
        phone: formData.phone,
        fileFormat: formData.fileFormat,
        size: formData.size,
        turnaroundTime: formData.turnaroundTime,
        complexity: formData.complexity,
        additionalDetails: formData.additionalDetails,
        designFileName: formData.designFile?.name
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setOrderComplete(true);
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('There was an error submitting your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      fileFormat: '',
      size: '',
      turnaroundTime: '',
      complexity: '',
      additionalDetails: '',
      designFile: null,
      email: '',
      phone: ''
    });
    setShowContactForm(false);
    setOrderComplete(false);
  };

  if (orderComplete) {
    return (
      <section id="order-form" className="order-form">
        <div className="container">
          <div className="form-container">
            <div className="success-message">
              <div className="success-icon">✅</div>
              <h2>Order Submitted Successfully!</h2>
              <p>Thank you for your order. We'll contact you soon with a quote and timeline.</p>
              <button 
                className="btn btn-primary"
                onClick={resetForm}
              >
                Place Another Order
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="order-form" className="order-form">
      <div className="container">
        <h2 className="section-title">Place Your Order</h2>
        
        <div className="form-container">
          {!showContactForm ? (
            <form onSubmit={handleInitialSubmit} className="order-details-form">
              <div className="form-group">
                <label htmlFor="fileFormat">File Format *</label>
                <select
                  id="fileFormat"
                  name="fileFormat"
                  value={formData.fileFormat}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select file format</option>
                  <option value="DST">DST</option>
                  <option value="PEX">PEX</option>
                  <option value="EXP">EXP</option>
                  <option value="JEF">JEF</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="size">Size *</label>
                <select
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select size</option>
                  <option value="Left Chest">Left Chest</option>
                  <option value="Front Chest">Front Chest</option>
                  <option value="Cap Front">Cap Front</option>
                  <option value="Jacket Back">Jacket Back</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="turnaroundTime">Turnaround Time *</label>
                <select
                  id="turnaroundTime"
                  name="turnaroundTime"
                  value={formData.turnaroundTime}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select turnaround time</option>
                  <option value="Same Day">Same Day (+$5-10)</option>
                  <option value="Normal">Normal (2-3 days)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="complexity">Complexity *</label>
                <select
                  id="complexity"
                  name="complexity"
                  value={formData.complexity}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select complexity</option>
                  <option value="Simple">Simple (text only)</option>
                  <option value="Medium">Medium (monogram)</option>
                  <option value="Complex">Complex (digital work)</option>
                  <option value="Hardcore">Hardcore (live image)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="additionalDetails">Additional Details</label>
                <textarea
                  id="additionalDetails"
                  name="additionalDetails"
                  value={formData.additionalDetails}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Please provide any additional details about your design requirements..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="designFile">Upload Design File</label>
                <input
                  type="file"
                  id="designFile"
                  name="designFile"
                  onChange={handleFileChange}
                  accept="image/*,.pdf,.ai,.eps,.svg"
                  className="file-input"
                />
                <div className="file-info">
                  Accepted formats: JPG, PNG, PDF, AI, EPS, SVG (Max 10MB)
                </div>
                {formData.designFile && (
                  <div className="file-selected">
                    ✅ File selected: {formData.designFile.name}
                  </div>
                )}
              </div>

              <button type="submit" className="btn btn-primary">
                Continue to Contact Details
              </button>
            </form>
          ) : (
            <div className="contact-form-section">
              <div className="process-notification">
                <div className="notification-icon">🎯</div>
                <h3>Your order is in process!</h3>
                <p>Please provide your contact details so we can send you a quote and updates.</p>
              </div>

              <form onSubmit={handleFinalSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowContactForm(false)}
                  >
                    Back to Order Details
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Order'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderForm;