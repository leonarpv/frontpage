import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import humanFormat from 'human-format';
import { Link as GatsbyLinkWrapper } from 'gatsby';
import { styles, animation, Cardinal, AvatarList } from '@storybook/design-system';
import customSVG from '../../../images/addon-catalog/custom.svg';
import { VerifiedBadge } from './VerifiedBadge';

const { hoverEffect, spacing, color, typography, breakpoint } = styles;
const { inlineGlow } = animation;

const AddonItemWrapper = styled.div`
  ${hoverEffect}
  display: flex;
  flex-direction: column;
  padding: ${spacing.padding.medium}px ${spacing.padding.medium}px 0;
  text-decoration: none;
  position: relative;

  @media (min-width: ${breakpoint * 1.5}px) {
    padding: ${spacing.padding.medium}px;

    ${(props) =>
      props.orientation === 'horizontal' &&
      `
        flex-direction: row;
        align-items: center;
      `}
  }
`;
AddonItemWrapper.propTypes = {
  orientation: PropTypes.oneOf(['vertical', 'horizontal']).isRequired,
};

const ClickIntercept = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

const Image = styled.div`
  flex: none;
  width: 48px;
  height: 48px;
  margin-right: ${spacing.padding.medium}px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  img {
    display: block;
    max-width: 100px;
    width: 100%;
    height: auto;
  }

  ${(props) =>
    props.isLoading &&
    css`
      ${inlineGlow}
      img {
        display: none;
      }
    `}

  @media (min-width: ${breakpoint * 1.5}px) {
    width: 64px;
    height: 64px;

    ${(props) =>
      props.orientation === 'vertical' &&
      `
        margin-bottom: 16px;
      `}
  }
`;
Image.propTypes = {
  orientation: PropTypes.oneOf(['vertical', 'horizontal']).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const Title = styled.div`
  font-weight: ${typography.weight.black};
  font-size: ${typography.size.s3}px;
  line-height: ${typography.size.m2}px;
  color: ${color.darker};
  display: flex;
  align-items: center;
  position: relative;

  ${(props) =>
    props.isLoading &&
    css`
      line-height: ${typography.size.m1}px;
      span {
        ${inlineGlow}
        margin-bottom: 8px;
      }
    `}
`;
Title.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

const Description = styled.div`
  font-size: ${typography.size.s2}px;
  line-height: ${typography.size.m1}px;
  color: ${color.darkest};
  position: relative;

  ${(props) =>
    props.isLoading &&
    css`
      line-height: ${typography.size.s3}px;
      span {
        ${inlineGlow}
      }
    `}
`;
Description.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

const AddonInfo = styled.div`
  display: flex;
  align-items: flex-start;

  @media (min-width: ${breakpoint * 1.5}px) {
    ${(props) =>
      props.orientation === 'horizontal' &&
      `
        align-items: center;
        margin-right: ${spacing.padding.large}px;
      `}

    ${(props) =>
      props.orientation === 'vertical' &&
      `
        display: block;
        margin-bottom: ${spacing.padding.medium}px;
      `}
  }
`;
AddonInfo.propTypes = {
  orientation: PropTypes.oneOf(['vertical', 'horizontal']).isRequired,
};

const Spacer = styled.div`
  border-top: 1px solid ${color.border};
  margin-top: ${spacing.padding.large}px;

  @media (min-width: ${breakpoint * 1.5}px) {
    flex: 1 1 auto;
    min-width: 0;
    margin: 0;
    border: 0;
  }
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-top: 16px;
  padding-bottom: 16px;

  @media (min-width: ${breakpoint * 1.5}px) {
    padding: 0;
  }
`;

const Stats = styled(Cardinal)`
  padding: 0;
  margin-right: ${spacing.padding.large}px;
`;

const Authors = styled(AvatarList)`
  min-width: 95.5px;
`;

export const AddonItem = ({
  image,
  title,
  description,
  downloads,
  addonUrl,
  authors,
  orientation,
  appearance,
  isLoading,
  verifiedCreator,
  ...props
}) => (
  <AddonItemWrapper orientation={orientation} {...props}>
    {!isLoading && addonUrl && <ClickIntercept as={GatsbyLinkWrapper} to={addonUrl} />}
    <AddonInfo orientation={orientation}>
      <Image orientation={orientation} isLoading={isLoading}>
        <img alt="" src={image} />
      </Image>
      <div>
        <Title isLoading={isLoading}>
          <span>{isLoading ? 'loading' : title}</span>
          {['official', 'integrator'].includes(appearance) && (
            <VerifiedBadge appearance={appearance} creator={verifiedCreator} />
          )}
        </Title>
        <Description isLoading={isLoading}>
          <span>{isLoading ? 'loading description of addon' : description}</span>
        </Description>
      </div>
    </AddonInfo>
    <Spacer />
    <Meta>
      <Stats
        size="small"
        count={
          isLoading
            ? undefined
            : humanFormat(downloads, {
                decimals: 1,
                separator: '',
              })
        }
        text={isLoading ? undefined : 'Downloads'}
        noPlural
        isLoading={isLoading}
      />
      <Authors users={isLoading ? undefined : authors} isLoading={isLoading} />
    </Meta>
  </AddonItemWrapper>
);

AddonItem.propTypes = {
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
  appearance: PropTypes.oneOf(['official', 'integrator', 'community']),
  image: PropTypes.node,
  title: PropTypes.node,
  description: PropTypes.node,
  downloads: PropTypes.number,
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      avatarUrl: PropTypes.string,
    })
  ),
  addonUrl: PropTypes.string,
  isLoading: PropTypes.bool,
  verifiedCreator: PropTypes.string,
};

AddonItem.defaultProps = {
  orientation: 'horizontal',
  appearance: 'community',
  image: customSVG,
  downloads: 0,
  authors: [],
  isLoading: false,
  addonUrl: '#',
  title: '',
  description: '',
  verifiedCreator: '',
};
