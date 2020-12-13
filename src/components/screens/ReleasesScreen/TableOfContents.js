import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { styles } from '@storybook/design-system';

import GatsbyLink from '../../basics/GatsbyLink';

const { breakpoint, color, typography } = styles;

const List = styled.ul`
  list-style: none;
  padding: 0;
  list-style: none;
  padding: 0;
  margin: 0 0 0 0;
  margin-bottom: 1rem;
  position: relative;
  text-align: left;

  @media (min-width: ${breakpoint * 1.333}px) {
    &:after {
      position: absolute;
      top: 12px;
      bottom: 12px;
      left: 43px;
      right: auto;
      width: auto;
      height: auto;
      border-right: 1px solid ${color.mediumlight};
      content: '';
      z-index: 0;
    }
  }

  @media (min-width: ${breakpoint * 1.333}px) {
    margin-right: 24px;
    text-align: right;

    &:after {
      left: auto;
      right: -21px;
    }
  }
`;

const ListItem = styled.li`
  display: inline-block;
  margin-right: 15px;

  a {
    display: inline-block;
    padding: 6px 0;
    line-height: 1.5;
    position: relative;
    z-index: 1;
    ${(props) => props.isActive && `font-weight: ${typography.weight.bold};`}
  }

  @media (min-width: ${breakpoint * 1.333}px) {
    margin-right: 0;
    display: block;

    a:after {
      position: absolute;
      top: 15px;
      left: auto;
      bottom: auto;
      right: -25px;
      width: auto;
      height: auto;
      background: ${color.medium};
      box-shadow: white 0 0 0 4px;
      height: 8px;
      width: 8px;
      border-radius: 1em;
      text-decoration: none !important;
      content: '';
      ${(props) => props.isActive && `background: ${color.secondary};`}
    }
  }
`;

const TableOfContents = ({ currentPageSlug, entries, ...rest }) => (
  <List {...rest}>
    {entries.map((entry) => {
      const isActive = currentPageSlug === entry.slug;

      return (
        <ListItem key={entry.slug} isActive={isActive}>
          <GatsbyLink to={entry.slug} tertiary={!isActive}>
            {entry.title}
          </GatsbyLink>
        </ListItem>
      );
    })}
  </List>
);

TableOfContents.propTypes = {
  currentPageSlug: PropTypes.string.isRequired,
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default TableOfContents;
