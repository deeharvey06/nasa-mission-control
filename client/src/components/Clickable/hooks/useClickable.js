const useClickable = (sounds, onClick) => {
  const clickWithSound = (e) => {
    sounds.click && sounds.click.play();
    onClick && onClick(e);
  };

  return { clickWithSound };
};

export default useClickable;
