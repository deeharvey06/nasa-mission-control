import { Paragraph } from 'arwes';

const LaunchParagraphs = ({ launchParagraphs }) => (
  <>
    {launchParagraphs.map((paragraph, index) => (
      <Paragraph key={`${paragraph}-${index}`}>{paragraph}</Paragraph>
    ))}
  </>
);

export default LaunchParagraphs;
