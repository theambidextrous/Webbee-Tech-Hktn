import React from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {StatusBar} from 'react-native';
import {DatePickerInput} from 'react-native-paper-dates';
import {Button, Checkbox, TextInput} from 'react-native-paper';
import {
  StyledSafeAreaView,
  StyledScrollView,
  CategoryItemWrapper,
  CategoryItem,
  HeaderRow,
  FlexColumnLeft,
  FlexColumnItemsLeft,
  CategoryTitle,
  FlexColumnRight,
  FlexColumn,
  HorizontalGap,
  StyledText,
  TitleText,
  FlexRowCenter,
} from './Styles';
import {
  AddMachine,
  Category,
  CategoryField,
  Machine,
  MachineProperty,
} from '../models';
import {useDispatch, useSelector} from 'react-redux';
import {
  addMachine,
  deleteMachine,
  updateMachineFieldValue,
} from '../redux/reducers/CategoriesReducer';
import {RootState} from '../redux/Store';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Machines = ({route}: {route: any}) => {
  const {categoryId} = route.params;
  const dispatch = useDispatch();
  const storedState = useSelector((state: RootState) => state);
  let category = storedState.category.find(
    (c: Category) => c.id === categoryId,
  );
  const thisCategory = category || {id: 0, machines: []};
  const {machines} = thisCategory;
  const nextId = Math.max(...machines.map((c: Machine) => c.id), 0);

  const extractFieldType = (fields: CategoryField[], target: number) =>
    fields.find((f: CategoryField) => f.id === target);

  const extractTitleFieldValue = (fieldId: number, props: MachineProperty[]) =>
    props.find((p: MachineProperty) => p.fieldId === fieldId);

  const categoryFields = thisCategory.fields || [];
  const titleField = categoryFields.find(f => f.isTitle === true);

  const onRemoveItemPressed = (machineId: number, catId: number) => {
    dispatch(deleteMachine({machineId, categoryId: catId}));
    return;
  };

  const onAddItemPressed = () => {
    const {id, fields} = thisCategory;
    const cleanedFields = fields?.filter(
      (field: CategoryField) => field.name !== 'Field',
    );
    const properties = cleanedFields?.map(
      (field: CategoryField): MachineProperty => ({
        fieldId: field.id,
      }),
    );
    if (properties !== undefined) {
      const addMachinePayload: AddMachine = {
        categoryId: id,
        machine: {
          id: nextId + 1,
          properties,
        },
      };
      dispatch(addMachine(addMachinePayload));
    }
  };

  const onFieldValueChanged = (
    value: any,
    fieldId: number,
    machineId: number,
  ) => {
    dispatch(updateMachineFieldValue({value, fieldId, machineId, categoryId}));
    return;
  };

  const buttonStyles = {
    marginTop: 20,
    borderRadius: 8,
  };

  const headerHeight = {maxHeight: 80};

  const iconSize = {fontSize: 30, color: '#7d7d7d'};

  return (
    <SafeAreaProvider>
      <StyledSafeAreaView>
        <StatusBar barStyle={'dark-content'} backgroundColor={Colors.lighter} />
        <HeaderRow style={headerHeight}>
          <FlexColumnLeft flex={3}>
            <CategoryTitle>{thisCategory.name}</CategoryTitle>
          </FlexColumnLeft>
          <FlexColumnRight flex={1}>
            <Button
              style={buttonStyles}
              mode="contained"
              compact={true}
              uppercase={true}
              onPress={onAddItemPressed}>
              <StyledText>ADD NEW ITEM</StyledText>
            </Button>
            <HorizontalGap gap={10} />
          </FlexColumnRight>
        </HeaderRow>
        <StyledScrollView flex={15}>
          <CategoryItemWrapper>
            {Array.isArray(machines) &&
              machines.length > 0 &&
              machines.map((mc: Machine, idx: number) => {
                /** search machines for value of title field */
                const titleFieldValue = extractTitleFieldValue(
                  titleField?.id || 0,
                  mc.properties,
                );
                return (
                  <CategoryItem key={idx}>
                    <TitleText>{titleFieldValue?.fieldValue}</TitleText>
                    <HorizontalGap gap={10} />
                    {mc.properties?.map(
                      (property: MachineProperty, iter: number) => {
                        if (
                          thisCategory.fields !== undefined &&
                          property.fieldId !== undefined
                        ) {
                          const fieldType = extractFieldType(
                            thisCategory.fields,
                            property.fieldId,
                          );
                          return (
                            <FlexColumn key={iter} flex={1}>
                              {/* text/number fields */}
                              {fieldType !== undefined &&
                                ['text', 'number'].includes(fieldType.type) && (
                                  <>
                                    <TextInput
                                      keyboardType={
                                        fieldType?.type === 'text'
                                          ? 'default'
                                          : 'number-pad'
                                      }
                                      placeholderTextColor="#bdbdbd"
                                      mode="outlined"
                                      placeholder={fieldType.name}
                                      label={fieldType.name}
                                      value={property.fieldValue}
                                      onChangeText={(text: any) => {
                                        onFieldValueChanged(
                                          text,
                                          property.fieldId || 0,
                                          mc.id,
                                        );
                                      }}
                                    />
                                    <HorizontalGap gap={10} />
                                  </>
                                )}
                              {/* checkbox fields */}
                              {fieldType !== undefined &&
                                fieldType.type === 'checkbox' && (
                                  <>
                                    <FlexRowCenter flex={1}>
                                      <Checkbox.Android
                                        uncheckedColor={'#000'}
                                        color={'#a31010'}
                                        status={
                                          property.fieldValue === true
                                            ? 'checked'
                                            : 'unchecked'
                                        }
                                        onPress={() => {
                                          onFieldValueChanged(
                                            !property.fieldValue,
                                            property.fieldId || 0,
                                            mc.id,
                                          );
                                        }}
                                      />
                                      <TitleText>{fieldType.name}</TitleText>
                                    </FlexRowCenter>
                                    <HorizontalGap gap={10} />
                                  </>
                                )}

                              {/* date fields */}
                              {fieldType !== undefined &&
                                fieldType.type === 'date' && (
                                  <>
                                    <DatePickerInput
                                      disabled={true}
                                      locale="en"
                                      label={fieldType.name}
                                      value={undefined}
                                      onChange={d => console.log('params', d)}
                                      mode="outlined"
                                    />
                                    <HorizontalGap gap={10} />
                                  </>
                                )}
                            </FlexColumn>
                          );
                        }
                      },
                    )}
                    <FlexColumnItemsLeft flex={1}>
                      <Button
                        style={buttonStyles}
                        mode="text"
                        icon="trash-can"
                        labelStyle={iconSize}
                        compact={true}
                        uppercase={true}
                        onPress={() =>
                          onRemoveItemPressed(mc.id, thisCategory.id)
                        }>
                        <StyledText>REMOVE</StyledText>
                      </Button>
                    </FlexColumnItemsLeft>
                  </CategoryItem>
                );
              })}
          </CategoryItemWrapper>
        </StyledScrollView>
      </StyledSafeAreaView>
    </SafeAreaProvider>
  );
};

export {Machines};
