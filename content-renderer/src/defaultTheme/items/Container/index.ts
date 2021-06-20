
import { ThemeItem } from '../../../theme';

import { Container, ContainerProps } from './Container';
import { ContainerSettings } from './ContainerSettings';

export const containerItem = new ThemeItem<ContainerProps>('Container', {
    isContainer: true,

    defaultProps: {},

    Component: Container,
    Settings: ContainerSettings
});
