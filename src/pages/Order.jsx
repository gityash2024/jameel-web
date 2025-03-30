<div className="order-detail-section">
  <h3 className="section-title">Shipping Information</h3>
  <div className="address-details">
    <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
    <p>{order.shippingAddress.addressLine1}</p>
    {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
    <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
    <p>{order.shippingAddress.country}</p>
    <p>{order.shippingAddress.phone}</p>
  </div>
  
  {/* FedEx Shipping Details */}
  {order.shipping && order.shipping.trackingNumber && (
    <div className="shipping-details mt-4">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium text-gray-700">Tracking Information</h4>
        <span className={`status-badge status-${order.shipping.status || 'pending'}`}>
          {(order.shipping.status || 'pending').replace('_', ' ')}
        </span>
      </div>
      
      <div className="bg-gray-50 p-3 rounded-md">
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div>
            <p className="text-sm text-gray-500">Carrier:</p>
            <p className="font-medium">{order.shipping.carrier || 'FedEx'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Service:</p>
            <p className="font-medium">{order.shipping.serviceType || 'Standard'}</p>
          </div>
        </div>
        
        <div className="mb-2">
          <p className="text-sm text-gray-500">Tracking Number:</p>
          <div className="flex items-center">
            <p className="font-medium mr-2">{order.shipping.trackingNumber}</p>
            <a 
              href={order.shipping.trackingUrl || `https://www.fedex.com/fedextrack/?trknbr=${order.shipping.trackingNumber}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 text-sm hover:underline"
            >
              Track Package
            </a>
          </div>
        </div>
        
        {order.shipping.estimatedDeliveryDate && (
          <div className="bg-blue-50 p-2 rounded-md mt-3">
            <p className="text-sm text-blue-800">Estimated Delivery:</p>
            <p className="font-medium text-blue-900">
              {new Date(order.shipping.estimatedDeliveryDate).toLocaleDateString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        )}
      </div>
    </div>
  )}
</div> 