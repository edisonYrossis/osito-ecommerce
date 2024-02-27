import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';

const ProductOptionsInput  = ({productOptions, setProductOptions}) => {


  const handleChange = (options) => {
    setProductOptions(options.slice(0, 28)); // Limita a un máximo de 6 tags
  };

  return (
    <div>
        <label>Opciones del Producto:</label>
        <TagsInput value={productOptions} onChange={handleChange} />
    </div>
  );
};

export default ProductOptionsInput;
