import Head from 'next/head';
import asset from '../lib/asset';

const CustomHead = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" type="image/svg+xml" href={asset('/vscode_icon.svg')} />
      <link rel="alternate icon" type="image/png" href={asset('/vscode_icon.png')} />
      <link rel="apple-touch-icon" href={asset('/vscode_icon.png')} />
      <meta
        name="description"
        content="Oussama Khaldi's Portfolio — AI R&D Engineer & ML Researcher."
      />
      <meta
        name="keywords"
        content="oussama khaldi, ai engineer, machine learning, llm, ai agents, rag, deep learning, pytorch, université paris cité, portfolio"
      />
      <meta property="og:title" content="Oussama Khaldi's Portfolio" />
      <meta
        property="og:description"
        content="Oussama Khaldi's Portfolio — AI R&D Engineer & ML Researcher."
      />
            <meta property="og:url" content="https://robottopdz.github.io" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default CustomHead;

CustomHead.defaultProps = {
  title: 'Oussama Khaldi',
};
