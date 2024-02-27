import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';

const ProductTagsInput = ({productTags, setProductTags}) => {


  const handleTagChange = (tags) => {
    setProductTags(tags.slice(0, 20)); // Limita a un máximo de 6 tags
  };

  return (
    <div>
        <label>Tags del Producto:</label>
      <TagsInput value={productTags} onChange={handleTagChange} placeholder='tags...' />
    </div>
  );
};

export default ProductTagsInput;
