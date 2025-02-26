import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { ChevronLeft, X, Check } from "lucide-react";
import { productAPI } from "../services/api";
import { toast } from "react-hot-toast";

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 40px 20px;
  
  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`;

const Breadcrumb = styled.div`
  margin-bottom: 24px;
  font-size: 14px;
  color: #666;

  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 12px;
    margin-bottom: 16px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background: #f5f5f5;
  }
`;

const CompareTable = styled.div`
  overflow-x: auto;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 16px;
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
    vertical-align: top;
    min-width: 200px;
    
    &:first-child {
      position: sticky;
      left: 0;
      background: white;
      z-index: 10;
      font-weight: 500;
      width: 200px;
      min-width: 200px;
      border-right: 1px solid #e0e0e0;
    }
    
    @media (max-width: 768px) {
      padding: 12px;
      min-width: 160px;
      
      &:first-child {
        width: 160px;
        min-width: 160px;
      }
    }
  }
  
  tr:nth-child(odd) {
    background-color: #f9f9f9;
    
    td:first-child {
      background-color: #f9f9f9;
    }
  }
  
  thead th {
    position: sticky;
    top: 0;
    background: white;
    z-index: 5;
    border-bottom: 2px solid #e0e0e0;
    
    &:first-child {
      z-index: 15;
    }
  }
`;

const ProductImage = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const ProductName = styled.div`
  font-weight: 500;
  margin-bottom: 8px;
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  
  .current {
    font-weight: bold;
    font-size: 16px;
  }
  
  .original {
    text-decoration: line-through;
    color: #666;
    font-size: 14px;
  }
  
  .discount {
    background: #e8f4f0;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
  }
`;

const ViewButton = styled.button`
  width: 100%;
  padding: 8px 0;
  background: black;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 8px;
  
  &:hover {
    background: #333;
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: white;
  border: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background: #f5f5f5;
  }
`;

const ProductHeader = styled.div`
  position: relative;
`;

const AvailabilityTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: ${props => props.inStock ? '#2e7d32' : '#d32f2f'};
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const SpecValue = styled.div`
  font-size: 14px;
  
  &.highlight {
    font-weight: 500;
    color: #2e7d32;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  
  &:after {
    content: " ";
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 6px solid #000;
    border-color: #000 transparent #000 transparent;
    animation: spinner 1.2s linear infinite;
  }
  
  @keyframes spinner {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  
  h2 {
    font-size: 24px;
    margin-bottom: 16px;
  }
  
  p {
    color: #666;
    margin-bottom: 24px;
    max-width: 500px;
  }
  
  button {
    padding: 10px 20px;
    background: black;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    
    &:hover {
      background: #333;
    }
  }
`;

const ProductCompare = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Parse product IDs from URL
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      
      const searchParams = new URLSearchParams(location.search);
      const productIds = searchParams.get('products');
      
      if (!productIds) {
        setLoading(false);
        return;
      }
      
      try {
        const ids = productIds.split(',');
        const productsData = [];
        
        // Fetch each product individually
        for (const id of ids) {
          try {
            const response = await productAPI.getProduct(id);
            if (response.data.data.product) {
              productsData.push(response.data.data.product);
            }
          } catch (error) {
            console.error(`Error fetching product ${id}:`, error);
          }
        }
        
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products for comparison');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [location.search]);
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleRemoveProduct = (productId) => {
    setProducts(prev => {
      const filtered = prev.filter(p => p._id !== productId);
      
      // Update URL
      const newIds = filtered.map(p => p._id).join(',');
      if (filtered.length > 1) {
        navigate(`/product-compare?products=${newIds}`, { replace: true });
      } else {
        navigate('/product-details');
      }
      
      return filtered;
    });
  };
  
  const handleViewProduct = (product) => {
    navigate(`/products/${product.slug}`);
  };
  
  // Get unique specification names across all products
  const getSpecificationNames = () => {
    const specNames = new Set();
    
    products.forEach(product => {
      if (product.specifications && product.specifications.length > 0) {
        product.specifications.forEach(spec => {
          specNames.add(spec.name);
        });
      }
    });
    
    return Array.from(specNames);
  };
  
  // Get unique attribute names across all products
  const getAttributeNames = () => {
    const attrNames = new Set();
    
    products.forEach(product => {
      if (product.attributes && product.attributes.length > 0) {
        product.attributes.forEach(attr => {
          attrNames.add(attr.name);
        });
      }
    });
    
    return Array.from(attrNames);
  };
  
  // Get attribute value for a product
  const getAttributeValue = (product, attrName) => {
    if (!product.attributes) return 'N/A';
    
    const attr = product.attributes.find(a => a.name === attrName);
    return attr ? attr.value : 'N/A';
  };
  
  // Get specification value for a product
  const getSpecificationValue = (product, specName) => {
    if (!product.specifications) return 'N/A';
    
    const spec = product.specifications.find(s => s.name === specName);
    return spec ? spec.value : 'N/A';
  };
  
  // Find the best value for a specification
  const findBestValue = (specName) => {
    // For numeric values like weight, dimensions, etc., lower or higher might be better
    // For now, we'll just highlight if all values are the same
    const values = products.map(p => getSpecificationValue(p, specName));
    const uniqueValues = new Set(values.filter(v => v !== 'N/A'));
    
    // If all values are the same (and not N/A), highlight them all
    if (uniqueValues.size === 1 && values.every(v => v !== 'N/A')) {
      return values[0];
    }
    
    return null;
  };
  
  const specificationNames = getSpecificationNames();
  const attributeNames = getAttributeNames();
  
  if (loading) {
    return (
      <Container>
        <LoadingSpinner />
      </Container>
    );
  }
  
  if (products.length < 2) {
    return (
      <Container>
        <EmptyState>
          <h2>Not enough products to compare</h2>
          <p>Please select at least 2 products to compare. You can select up to 5 products from the product list.</p>
          <button onClick={() => navigate('/product-details')}>
            Go to Products
          </button>
        </EmptyState>
      </Container>
    );
  }
  
  return (
    <Container>
      <Breadcrumb>
        <Link to="/">Home</Link> / 
        <Link to="/product-details">Products</Link> / 
        <span>Compare Products</span>
      </Breadcrumb>
      
      <Header>
        <Title>Compare Products</Title>
        <BackButton onClick={handleBack}>
          <ChevronLeft size={18} />
          Back to Products
        </BackButton>
      </Header>
      
      <CompareTable>
        <Table>
          <thead>
            <tr>
              <th>Product</th>
              {products.map(product => (
                <th key={product._id}>
                  <ProductHeader>
                    <RemoveButton onClick={() => handleRemoveProduct(product._id)}>
                      <X size={14} />
                    </RemoveButton>
                    <ProductImage>
                      <img 
                        src={product.images?.[0]?.url || '/placeholder.png'} 
                        alt={product.name} 
                      />
                    </ProductImage>
                    <ProductName>{product.name}</ProductName>
                    <ProductPrice>
                      <span className="current">
                        ${(product.salePrice || product.regularPrice).toFixed(2)}
                      </span>
                      
                      {product.salePrice && product.salePrice < product.regularPrice && (
                        <>
                          <span className="original">${product.regularPrice.toFixed(2)}</span>
                          <span className="discount">
                            {Math.round((1 - product.salePrice / product.regularPrice) * 100)}% off
                          </span>
                        </>
                      )}
                    </ProductPrice>
                    <ViewButton onClick={() => handleViewProduct(product)}>
                      View Product
                    </ViewButton>
                  </ProductHeader>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Availability</td>
              {products.map(product => (
                <td key={product._id}>
                  {product.stockQuantity > 0 ? (
                    <AvailabilityTag inStock={true}>
                      <Check size={16} />
                      In Stock
                    </AvailabilityTag>
                  ) : (
                    <AvailabilityTag inStock={false}>
                      <X size={16} />
                      Out of Stock
                    </AvailabilityTag>
                  )}
                </td>
              ))}
            </tr>
            <tr>
              <td>Brand</td>
              {products.map(product => (
                <td key={product._id}>{product.brand || 'N/A'}</td>
              ))}
            </tr>
            {attributeNames.map(attrName => (
              <tr key={`attr-${attrName}`}>
                <td>{attrName}</td>
                {products.map(product => (
                  <td key={product._id}>{getAttributeValue(product, attrName)}</td>
                ))}
              </tr>
            ))}
            {specificationNames.map(specName => {
              const bestValue = findBestValue(specName);
              return (
                <tr key={`spec-${specName}`}>
                  <td>{specName}</td>
                  {products.map(product => {
                    const value = getSpecificationValue(product, specName);
                    const isHighlighted = bestValue !== null && value === bestValue;
                    
                    return (
                      <td key={product._id}>
                        <SpecValue className={isHighlighted ? 'highlight' : ''}>
                          {value}
                        </SpecValue>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            {products.some(p => p.materials && p.materials.length > 0) && (
              <tr>
                <td>Materials</td>
                {products.map(product => (
                  <td key={product._id}>
                    {product.materials && product.materials.length > 0 
                      ? product.materials.join(', ') 
                      : 'N/A'}
                  </td>
                ))}
              </tr>
            )}
            {products.some(p => p.dimensions) && (
              <tr>
                <td>Dimensions</td>
                {products.map(product => (
                  <td key={product._id}>
                    {product.dimensions 
                      ? `${product.dimensions.length} × ${product.dimensions.width} × ${product.dimensions.height} ${product.dimensions.unit}` 
                      : 'N/A'}
                  </td>
                ))}
              </tr>
            )}
            {products.some(p => p.weight) && (
              <tr>
                <td>Weight</td>
                {products.map(product => (
                  <td key={product._id}>
                    {product.weight 
                      ? `${product.weight.value} ${product.weight.unit}` 
                      : 'N/A'}
                  </td>
                ))}
              </tr>
            )}
            <tr>
              <td>Description</td>
              {products.map(product => (
                <td key={product._id}>
                  {product.shortDescription || 'N/A'}
                </td>
              ))}
            </tr>
            <tr>
              <td>Rating</td>
              {products.map(product => (
                <td key={product._id}>
                  {product.averageRating ? `${product.averageRating.toFixed(1)}/5 (${product.numberOfReviews} reviews)` : 'No ratings yet'}
                </td>
              ))}
            </tr>
          </tbody>
        </Table>
      </CompareTable>
    </Container>
  );
};

export default ProductCompare;