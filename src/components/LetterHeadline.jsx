const LetterHeadline = ({ text, className, tone = 'light', as: Tag = 'p' }) => {
  const restColor = tone === 'dark' ? 'var(--ink)' : '#ffffff';

  return (
    <Tag className={className} aria-hidden="true">
      {text.split('').map((char, index) => {
        if (char === ' ') {
          return (
            <span key={`space-${index}`} className="hero-letter-space">
              {' '}
            </span>
          );
        }

        return (
          <span
            key={`${char}-${index}`}
            className="hero-letter"
            data-letter="true"
            style={{ color: restColor }}
            onPointerEnter={(event) => {
              event.currentTarget.style.setProperty('color', 'var(--gold)', 'important');
            }}
            onPointerLeave={(event) => {
              event.currentTarget.style.setProperty('color', restColor, 'important');
            }}
          >
            {char}
          </span>
        );
      })}
    </Tag>
  );
};

export default LetterHeadline;
