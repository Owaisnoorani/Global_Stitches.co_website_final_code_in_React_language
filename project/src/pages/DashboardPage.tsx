import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { Order } from '../types/Order';

const DashboardPage: React.FC = () => {
  const { logout } = useAuth();
  const { orders, updateOrderStatus } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const handleLogout = () => {
    logout();
  };

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    updateOrderStatus(orderId, newStatus);
  };

  const getStatusColor = (status: Order['status']): string => {
    switch (status) {
      case 'pending':
        return '#f39c12';
      case 'in-progress':
        return '#3498db';
      case 'completed':
        return '#27ae60';
      case 'cancelled':
        return '#e74c3c';
      default:
        return '#95a5a6';
    }
  };

  const getStatusIcon = (status: Order['status']): string => {
    switch (status) {
      case 'pending':
        return '⏳';
      case 'in-progress':
        return '🔄';
      case 'completed':
        return '✅';
      case 'cancelled':
        return '❌';
      default:
        return '📋';
    }
  };

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    inProgress: orders.filter(o => o.status === 'in-progress').length,
    completed: orders.filter(o => o.status === 'completed').length,
    totalRevenue: orders.reduce((sum, order) => sum + order.totalAmount, 0)
  };

  return (
    <div className="dashboard-page">
      {/* Dashboard Header */}
      <header className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="dashboard-brand">
            <h1>Global Stitches.co</h1>
            <span className="dashboard-subtitle">Admin Dashboard</span>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            🚪 Logout
          </button>
        </div>
      </header>

      <div className="dashboard-container">
        {/* Dashboard Stats */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <h3>{orderStats.total}</h3>
              <p>Total Orders</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <h3>{orderStats.pending}</h3>
              <p>Pending</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🔄</div>
            <div className="stat-info">
              <h3>{orderStats.inProgress}</h3>
              <p>In Progress</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>{orderStats.completed}</h3>
              <p>Completed</p>
            </div>
          </div>
          <div className="stat-card revenue">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <h3>${orderStats.totalRevenue.toFixed(2)}</h3>
              <p>Total Revenue</p>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="orders-section">
          <div className="orders-header">
            <h2>Orders Management</h2>
            <div className="orders-filters">
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
                className="status-filter"
              >
                <option value="all">All Orders</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="no-orders">
              <div className="no-orders-icon">📋</div>
              <h3>No orders found</h3>
              <p>No orders match the selected filter criteria.</p>
            </div>
          ) : (
            <div className="orders-grid">
              {filteredOrders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div className="order-id">
                      <strong>{order.id}</strong>
                    </div>
                    <div 
                      className="order-status"
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {getStatusIcon(order.status)} {order.status.replace('-', ' ')}
                    </div>
                  </div>

                  <div className="order-customer">
                    <h4>{order.customerName}</h4>
                    <p>📧 {order.email}</p>
                    <p>📱 {order.phone}</p>
                  </div>

                  <div className="order-details">
                    <div className="detail-row">
                      <span>Format:</span>
                      <strong>{order.fileFormat}</strong>
                    </div>
                    <div className="detail-row">
                      <span>Size:</span>
                      <strong>{order.size}</strong>
                    </div>
                    <div className="detail-row">
                      <span>Complexity:</span>
                      <strong>{order.complexity}</strong>
                    </div>
                    <div className="detail-row">
                      <span>Turnaround:</span>
                      <strong>{order.turnaroundTime}</strong>
                    </div>
                    {order.designFileName && (
                      <div className="detail-row">
                        <span>File:</span>
                        <strong>{order.designFileName}</strong>
                      </div>
                    )}
                  </div>

                  {order.additionalDetails && (
                    <div className="order-notes">
                      <strong>Notes:</strong>
                      <p>{order.additionalDetails}</p>
                    </div>
                  )}

                  <div className="order-footer">
                    <div className="order-date">
                      📅 {new Date(order.orderDate).toLocaleDateString()}
                    </div>
                    <div className="order-amount">
                      💰 ${order.totalAmount.toFixed(2)}
                    </div>
                  </div>

                  <div className="order-actions">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                      className="status-select"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="view-details-btn"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Order Details - {selectedOrder.id}</h3>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="modal-close"
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-section">
                <h4>Customer Information</h4>
                <p><strong>Name:</strong> {selectedOrder.customerName}</p>
                <p><strong>Email:</strong> {selectedOrder.email}</p>
                <p><strong>Phone:</strong> {selectedOrder.phone}</p>
              </div>
              <div className="detail-section">
                <h4>Order Specifications</h4>
                <p><strong>File Format:</strong> {selectedOrder.fileFormat}</p>
                <p><strong>Size:</strong> {selectedOrder.size}</p>
                <p><strong>Complexity:</strong> {selectedOrder.complexity}</p>
                <p><strong>Turnaround Time:</strong> {selectedOrder.turnaroundTime}</p>
                {selectedOrder.designFileName && (
                  <p><strong>Design File:</strong> {selectedOrder.designFileName}</p>
                )}
              </div>
              {selectedOrder.additionalDetails && (
                <div className="detail-section">
                  <h4>Additional Details</h4>
                  <p>{selectedOrder.additionalDetails}</p>
                </div>
              )}
              <div className="detail-section">
                <h4>Order Information</h4>
                <p><strong>Order Date:</strong> {new Date(selectedOrder.orderDate).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {selectedOrder.status}</p>
                <p><strong>Total Amount:</strong> ${selectedOrder.totalAmount.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;