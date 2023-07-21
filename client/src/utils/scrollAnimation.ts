export const scrollToDown = (scrollElem: HTMLElement, items: HTMLElement[]) => {
  const onDown = (e: Event | { target: HTMLElement }) => {
    if (!items.length) return (scrollElem.onscroll = null);
    const seeZone = (e.target as HTMLElement).scrollTop + (e.target as HTMLElement).offsetHeight;
    for (const i of items)
      if (seeZone > i.offsetTop + i.offsetHeight / 2)
        (i as HTMLElement).setAttribute("active", "true"), (items = items.filter((e) => e !== i));
  };

  onDown({ target: scrollElem });
  scrollElem.onscroll = onDown;
};
