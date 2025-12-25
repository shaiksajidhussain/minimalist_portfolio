import { useState } from 'react';
import { useTheme, COLOR_THEMES } from '../context/ThemeContext';
import { FiDroplet } from 'react-icons/fi';

const ColorThemeSelector = () => {
  try {
    const theme = useTheme();
    const { colorTheme, changeColorTheme } = theme;
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors flex items-center gap-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-zinc-700"
          title="Change theme color"
        >
          <FiDroplet size={18} />
          <span className="text-xs font-medium hidden sm:inline">Color</span>
        </button>

        {isOpen && (
          <div className="absolute right-0 top-12 bg-white dark:bg-zinc-800 rounded-lg shadow-2xl border border-gray-200 dark:border-zinc-700 p-4 z-50 min-w-max">
            <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-3 uppercase tracking-wider">
              Pick Color
            </div>
            <div className="grid grid-cols-5 gap-2">
              {Object.entries(COLOR_THEMES).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => {
                    changeColorTheme(key);
                    setIsOpen(false);
                  }}
                  className={`w-10 h-10 rounded-full transition-all transform hover:scale-110 border-2 ${
                    colorTheme === key ? 'border-gray-800 dark:border-white ring-2 ring-offset-2 ring-gray-400 dark:ring-offset-zinc-800' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: value.primary }}
                  title={value.name}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.log('ColorThemeSelector not available yet');
    return null;
  }
};

export default ColorThemeSelector;
