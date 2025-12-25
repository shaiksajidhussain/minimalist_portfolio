import { useState } from 'react';
import './CodePreview.css';

const CodePreview = ({ 
  language = 'javascript', 
  filename, 
  highlightLines = [], 
  code, 
  tabs = [] 
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const getCodeToDisplay = () => {
    if (tabs.length > 0) {
      return tabs[activeTab]?.code || '';
    }
    return code || '';
  };

  const getLanguage = () => {
    if (tabs.length > 0) {
      return tabs[activeTab]?.language || language;
    }
    return language;
  };

  const getHighlightLines = () => {
    if (tabs.length > 0 && tabs[activeTab]?.highlightLines) {
      return tabs[activeTab].highlightLines;
    }
    return highlightLines;
  };

  const codeContent = getCodeToDisplay();
  const currentLanguage = getLanguage();
  const currentHighlightLines = getHighlightLines();

  const getLanguageColor = (lang) => {
    const colors = {
      javascript: '#f7df1e',
      typescript: '#3178c6',
      html: '#e34c26',
      css: '#264de4',
      python: '#3776ab',
      java: '#ed8b00',
      default: '#9ca3af'
    };
    return colors[lang.toLowerCase()] || colors.default;
  };

  const formatCode = (code) => {
    return code.split('\n').map((line, index) => {
      const isHighlighted = currentHighlightLines.includes(index + 1);
      return (
        <div 
          key={index} 
          className={`code-line ${isHighlighted ? 'highlighted' : ''}`}
        >
          <span className="line-number">{index + 1}</span>
          <span className="line-content">{line || ' '}</span>
        </div>
      );
    });
  };

  return (
    <div className="code-preview">
      {/* Header */}
      <div className="code-preview-header">
        <div className="code-preview-dots">
          <span className="dot dot-red"></span>
          <span className="dot dot-yellow"></span>
          <span className="dot dot-green"></span>
        </div>
        {tabs.length > 0 ? (
          <div className="code-preview-tabs">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`code-tab ${activeTab === index ? 'active' : ''}`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        ) : (
          <div className="code-preview-filename">
            <span 
              className="language-indicator"
              style={{ backgroundColor: getLanguageColor(currentLanguage) }}
            ></span>
            {filename}
          </div>
        )}
      </div>

      {/* Code Content */}
      <div className="code-preview-content">
        <pre className="code-block">
          <code className={`language-${currentLanguage}`}>
            {formatCode(codeContent)}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodePreview;

