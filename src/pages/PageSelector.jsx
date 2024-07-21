import { useState, useCallback } from 'react';
import '../App.css';

const pages = [1, 2, 3, 4, 5, 6];

// eslint-disable-next-line react/prop-types
const Button = ({ children, onClick }) => (
  <button className="done-button" onClick={onClick}>
    {children}
  </button>
);

// eslint-disable-next-line react/prop-types
const Checkbox = ({checked, onChange}) => (
  <div className={`checkbox ${checked ? 'checked' : ''}`} onClick={onChange}>
    <span className="checkmark">✓</span>
  </div>
);

const PageSelector = () => {
  const [selectedPages, setSelectedPages] = useState([]);
  const [focusedPage, setFocusedPage] = useState(null);

  const togglePage = (page) => {
    setSelectedPages(prev => 
      prev.includes(page) ? prev.filter(p => p !== page) : [...prev, page]
    );
  };

  const handleDoubleClick = useCallback((page) => {
    setFocusedPage(page);
    setTimeout(() => setFocusedPage(null), 500); 
  }, []);

  return (
    <div className="container">
      <div className="selector-box">
        <div className="option" onClick={() => setSelectedPages(selectedPages.length === pages.length ? [] : [...pages])}>
          <span>All pages</span>
          <Checkbox 
            checked={selectedPages.length === pages.length} 
            onChange={() => setSelectedPages(selectedPages.length === pages.length ? [] : [...pages])}
          />
        </div>
        <hr />
        <div className="pages-container">
          {pages.map(page => (
            <div 
              key={page} 
              className={`option ${focusedPage === page ? 'focused' : ''}`}
              onClick={() => togglePage(page)}
              onDoubleClick={() => handleDoubleClick(page)}
            >
              <span>Page {page}</span>
              <Checkbox checked={selectedPages.includes(page)} onChange={() => togglePage(page)} />
            </div>
          ))}
        </div>
        <hr />
        <Button onClick={() => console.log('Done clicked')}>Done</Button>
      </div>
    </div>
  );
};

export default PageSelector;