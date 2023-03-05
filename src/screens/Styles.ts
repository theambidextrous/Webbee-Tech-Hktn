import styled from 'styled-components/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface FlexColumnProps {
  readonly flex: number;
}

interface GapProps {
  readonly gap: number;
}

export const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${Colors.lighter};
`;

export const StyledScrollView = styled.ScrollView<FlexColumnProps>`
  flex: ${(props: any) => props.flex};
  background-color: ${Colors.lighter};
  padding: 20px 20px;
`;

export const CategoryItemWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const CategoryItem = styled.View`
  background-color: #fff;
  padding: 15px;
  margin: 10px;
  height: auto;
  flex-basis: 45%;
`;

export const HeaderRow = styled.View`
  flex: 1;
  flex-direction: row;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #e4e4e4;
`;

export const FlexFooterColumn = styled.View<FlexColumnProps>`
  flex: ${(props: any) => props.flex};
  padding: 20px 20px;
`;

export const FlexColumn = styled.View<FlexColumnProps>`
  flex: ${(props: any) => props.flex};
`;

export const FlexColumnCenter = styled.View<FlexColumnProps>`
  flex: ${(props: any) => props.flex};
  justify-content: center;
`;

export const FlexColumnLeft = styled.View<FlexColumnProps>`
  flex: ${(props: any) => props.flex};
  justify-content: center;
`;

export const FlexColumnItemsLeft = styled.View<FlexColumnProps>`
  flex: ${(props: any) => props.flex};
  justify-content: center;
  align-items: flex-start;
`;

export const FlexColumnRight = styled.View<FlexColumnProps>`
  flex: ${(props: any) => props.flex};
  justify-content: center;
`;

export const FlexRow = styled.View<FlexColumnProps>`
  flex: ${(props: any) => props.flex};
  flex-direction: row;
`;

export const FlexRowCenter = styled.View<FlexColumnProps>`
  flex: ${(props: any) => props.flex};
  flex-direction: row;
  align-items: center;
`;

export const VerticalGap = styled.View<GapProps>`
  width: ${(props: any) => props.gap}px;
`;

export const HorizontalGap = styled.View<GapProps>`
  height: ${(props: any) => props.gap}px;
`;

export const StyledText = styled.Text`
  font-size: 22px;
  font-weight: 700;
  line-height: 26px;
`;

export const CategoryTitle = styled.Text`
  font-size: 30px;
  font-weight: 700;
  line-height: 36px;
`;

export const TitleText = styled.Text`
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  color: #7d7d7d;
`;
