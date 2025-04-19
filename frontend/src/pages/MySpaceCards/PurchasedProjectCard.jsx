const PurchasedProjectCard = ({ purchase }) => {
    const product = purchase.productId;
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-purple-400 mb-2">{product.title}</h2>
        <p className="text-gray-300 mb-4">{product.description}</p>
        <p className="text-sm text-gray-400 mb-2"><strong>Paid:</strong> ${purchase.amountPaid}</p>
        <p className="text-sm text-gray-400"><strong>Transaction ID:</strong> {purchase.transactionId}</p>
      </div>
    );
  };
  export default PurchasedProjectCard;
  