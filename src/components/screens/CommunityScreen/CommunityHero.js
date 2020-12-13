import React from 'react';

import styled from 'styled-components';
import GitHubButton from 'react-github-button';

import { styles } from '@storybook/design-system';
import { Cardinal } from '../../basics';

import ConfirmedMailingList from '../../layout/ConfirmedMailingList';
import NpmDownloadCount from '../../layout/NpmDownloadCount';
import { Heading, Title, Desc } from '../../layout/PageTitle';

import useSiteMetadata from '../../lib/useSiteMetadata';

const { pageMargins, breakpoint } = styles;

const Image = styled.img``;

const Media = styled.div`
  width: 100%;
  position: relative;

  ${Image} {
    max-width: 320px;
    height: auto;
    display: block;
    width: 100%;
    object-fit: contain;

    @media (min-width: ${breakpoint}px) {
      max-width: 440px;
    }
  }
`;

const Meta = styled.div``;

const Wrapper = styled.div`
  ${pageMargins};
  padding-top: 3rem !important;
  padding-bottom: 3rem !important;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;

  text-align: center;

  ${Media} {
    display: flex;
    justify-content: center;

    ${Image} {
      align-self: start;
    }
  }

  @media (min-width: ${breakpoint}px) {
    padding-top: 5rem !important;
    padding-bottom: 5rem !important;
    min-height: 70vh;
    text-align: left;

    align-items: center;
    flex-direction: row;

    ${Meta}, ${Media} {
      flex: 1;
    }

    ${Meta} {
      max-width: 480px;
      padding-right: 5%;
    }

    ${Media} {
      justify-content: flex-end;

      ${Image} {
        align-self: flex-end;
      }
    }
  }
`;

const GitHubWrapper = styled.div`
  margin-bottom: 0.75rem;

  @media (min-width: ${breakpoint * 2}px) {
    ${'' /* this has a bit different styling than stats children */};
    margin-bottom: 1.25rem;
  }

  ${'' /* Overrides to make a medium-sized button */};
  .github-btn {
    font: bold 12px/14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
    display: block;

    height: auto;
    .gh-btn,
    .gh-count {
      padding: 2px 6px;
    }

    .gh-ico {
      height: 12px;
      width: 12px;
      margin-top: 1px;
    }
  }
`;

const Stat = styled(Cardinal)`
  padding: 0;
  display: block;
`;

const NpmDownloadStat = styled(NpmDownloadCount)`
  padding: 0;
  display: block;
`;

const Stats = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
  justify-content: space-around;

  @media (min-width: ${breakpoint}px) {
    justify-content: stretch;
    > * {
      flex: 1;
    }
  }
`;

const MailingListForm = styled(ConfirmedMailingList)`
  min-width: 280px;
  width: 100%;
`;

const MailingListWrapper = styled.div`
  margin-top: 1rem;
  margin-bottom: 2rem;

  @media (min-width: ${breakpoint}px) {
    margin-top: 1.5rem;
    margin-bottom: 2rem;
  }

  ${MailingListForm} {
    margin: 0 auto;
    @media (min-width: ${breakpoint}px) {
      margin: 0;
    }
  }
`;

export default function CommunityHero(props) {
  const { urls = {}, contributorCount } = useSiteMetadata();
  const { gitHub = {} } = urls;
  return (
    <Wrapper {...props}>
      <Meta>
        <Heading color="seafoam">Community</Heading>
        <Title>Get involved</Title>
        <Desc>
          Thousands of frontend developers use Storybook every day. Join us to learn new techniques,
          get help, and develop UIs faster.
        </Desc>
        <MailingListWrapper>
          <MailingListForm />
        </MailingListWrapper>
        <Stats>
          <NpmDownloadStat className="chromatic-ignore" />
          <Stat
            size="small"
            count={`+${contributorCount}`}
            text="Contributors"
            noPlural
            status="tertiary"
            countLink={gitHub.contributors}
          />
          <GitHubWrapper className="chromatic-ignore">
            <GitHubButton type="stargazers" namespace="storybookjs" repo="storybook" />
          </GitHubWrapper>
        </Stats>
      </Meta>

      <Media>
        <Image src="/images/community/hero.jpg" />
      </Media>
    </Wrapper>
  );
}
