import React from 'react';
import {StatusBar} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import DropDown from 'react-native-paper-dropdown';
import {RootState} from '../redux/Store';
import {
  addCategory,
  addCategoryField,
  deleteCategory,
  deleteCategoryField,
  updateCategoryFieldIsTitle,
  updateCategoryFieldName,
  updateCategoryFieldType,
  updateCategoryName,
} from '../redux/reducers/CategoriesReducer';
import {
  AddCategoryField,
  Category,
  CategoryField,
  DeleteCategoryField,
  UpdateCategory,
  UpdateCategoryField,
} from '../models';

interface FlexColumnProps {
  readonly flex: number;
}

interface GapProps {
  readonly gap: number;
}

const buttonStyles = {
  marginTop: 20,
  width: '100%',
  height: 44,
  borderRadius: 8,
};

const Categories = () => {
  const dispatch = useDispatch();
  const storedState = useSelector((state: RootState) => state);
  const {attribute, category} = storedState;
  const nextId = Math.max(...category.map(c => c.id), 0);
  const [activePicker, setActivePicker] = React.useState(0);

  const extractTitleField = (fields: CategoryField[] | undefined) => {
    const foundItem = fields?.find(f => f.isTitle === true);
    if (foundItem !== undefined) {
      return foundItem.name;
    }
    return undefined;
  };

  const fieldToDropDownFormat = (fields: any) => {
    if (fields === undefined) {
      return [];
    }
    return fields.map((f: CategoryField) => ({value: f.id, label: f.name}));
  };

  const onAddCategoryPressed = () => {
    const id = nextId + 1;
    const catPayload: Category = {
      id,
      name: 'New Category',
      fields: [{id: 1, type: 'text', name: 'Field', isTitle: false}],
    };
    dispatch(addCategory(catPayload));
  };

  const onCategoryNameChanged = (name: string, categoryId: number) => {
    const categoryForUpdate: Category = {
      id: categoryId,
      name,
    };
    const updateCatPayload: UpdateCategory = {
      categoryId,
      category: categoryForUpdate,
    };
    dispatch(updateCategoryName(updateCatPayload));
    return;
  };

  const onCategoryFieldChanged = (
    text: string,
    categoryId: number,
    fieldId: number,
    change: string,
  ) => {
    const updateFieldPayload: UpdateCategoryField = {
      categoryId,
      fieldId,
      value: text,
    };
    switch (change) {
      /** field name changed */
      case 'name':
        dispatch(updateCategoryFieldName(updateFieldPayload));
        break;

      /** field type changed */
      case 'type':
        dispatch(updateCategoryFieldType(updateFieldPayload));
        break;

      case 'add':
        const addFieldPayload: AddCategoryField = {
          categoryId,
          field: {
            id: 0, // for format purposes
            type: text,
            isTitle: false,
          },
        };
        dispatch(addCategoryField(addFieldPayload));
        break;

      case 'isTitle':
        dispatch(updateCategoryFieldIsTitle(updateFieldPayload));
        break;

      default:
        break;
    }
  };

  const onCategoryFieldDeleted = (categoryId: number, fieldId: number) => {
    const deleteFieldPayload: DeleteCategoryField = {
      categoryId,
      fieldId,
    };
    dispatch(deleteCategoryField(deleteFieldPayload));
  };

  const onCategoryDeleted = (categoryId: number) => {
    dispatch(deleteCategory(categoryId));
    return;
  };

  const iconSize = {fontSize: 40, color: '#7d7d7d'};

  return (
    <StyledSafeAreaView>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.lighter} />
      <StyledScrollView flex={8}>
        <CategoryItemWrapper>
          {Array.isArray(category) &&
            category.length > 0 &&
            category.map((categ: Category, idx: number) => (
              <CategoryItem key={idx}>
                <TitleText>{categ.name}</TitleText>
                <HorizontalGap gap={10} />
                <TextInput
                  mode="outlined"
                  label="Category Name"
                  value={categ.name}
                  onChangeText={text => onCategoryNameChanged(text, categ.id)}
                />
                <HorizontalGap gap={10} />
                {/* Fields */}
                {categ.fields?.map((field: CategoryField, index: number) => {
                  const keyString = Number(String(categ.id) + String(field.id));
                  return (
                    <>
                      <FlexRow key={index + idx} flex={1}>
                        <FlexColumn flex={8}>
                          <FlexRow flex={5}>
                            <FlexColumnCenter flex={2}>
                              <TextInput
                                mode="outlined"
                                label="Field"
                                value={field.name}
                                onChangeText={text =>
                                  onCategoryFieldChanged(
                                    text,
                                    categ.id,
                                    field.id,
                                    'name',
                                  )
                                }
                              />
                            </FlexColumnCenter>
                            <VerticalGap gap={10} />
                            <FlexColumnCenter flex={1}>
                              <DropDown
                                label={String(field.type).toLocaleUpperCase()}
                                mode={'outlined'}
                                visible={activePicker === keyString}
                                showDropDown={() => {
                                  setActivePicker(keyString);
                                }}
                                onDismiss={() => {
                                  setActivePicker(0);
                                }}
                                value={null}
                                setValue={(_value: any) => {
                                  onCategoryFieldChanged(
                                    _value,
                                    categ.id,
                                    field.id,
                                    'type',
                                  );
                                  console.log('value', _value);
                                }}
                                list={attribute}
                              />
                            </FlexColumnCenter>
                          </FlexRow>
                        </FlexColumn>
                        <FlexColumnCenter flex={1}>
                          <Button
                            mode="text"
                            compact={true}
                            labelStyle={iconSize}
                            icon="trash-can"
                            onPress={() =>
                              onCategoryFieldDeleted(categ.id, field.id)
                            }>
                            {''}
                          </Button>
                        </FlexColumnCenter>
                      </FlexRow>
                      <HorizontalGap gap={10} />
                    </>
                  );
                })}
                <HorizontalGap gap={10} />
                {/* title field selector */}
                <FlexColumn flex={1}>
                  <DropDown
                    label={`TITLE FIELD: ${
                      extractTitleField(categ.fields) || 'UNAMED FIELD'
                    }`}
                    mode={'outlined'}
                    visible={activePicker === Number(categ.id - categ.id * 10)}
                    showDropDown={() => {
                      setActivePicker(Number(categ.id - categ.id * 10));
                    }}
                    onDismiss={() => {
                      setActivePicker(0);
                    }}
                    value={null}
                    setValue={(_value: any) => {
                      onCategoryFieldChanged(
                        _value,
                        categ.id,
                        _value,
                        'isTitle',
                      );
                      console.log('value', _value);
                    }}
                    list={fieldToDropDownFormat(categ.fields)}
                  />
                </FlexColumn>
                {/* Add field / remove category */}
                <HorizontalGap gap={10} />
                <FlexRow flex={1}>
                  <FlexColumnCenter flex={1}>
                    <DropDown
                      label={'ADD NEW FIELD'}
                      mode={'outlined'}
                      visible={activePicker === categ.id}
                      showDropDown={() => {
                        setActivePicker(categ.id);
                      }}
                      onDismiss={() => {
                        setActivePicker(0);
                      }}
                      value={null}
                      setValue={(_value: any) => {
                        onCategoryFieldChanged(_value, categ.id, 0, 'add');
                        console.log('value', _value);
                      }}
                      list={attribute}
                    />
                  </FlexColumnCenter>
                  <FlexColumnCenter flex={1}>
                    <Button
                      mode="text"
                      compact={true}
                      icon="trash-can"
                      labelStyle={iconSize}
                      onPress={() => onCategoryDeleted(categ.id)}>
                      <StyledText>REMOVE</StyledText>
                    </Button>
                  </FlexColumnCenter>
                </FlexRow>
              </CategoryItem>
            ))}
        </CategoryItemWrapper>
      </StyledScrollView>
      <FlexFooterColumn flex={1}>
        <Button
          style={buttonStyles}
          mode="contained"
          compact={true}
          uppercase={true}
          onPress={onAddCategoryPressed}>
          <StyledText>Add A Category</StyledText>
        </Button>
      </FlexFooterColumn>
    </StyledSafeAreaView>
  );
};

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${Colors.lighter};
`;

const StyledScrollView = styled.ScrollView<FlexColumnProps>`
  flex: ${(props: any) => props.flex};
  background-color: #f2efef;
  padding: 20px 20px;
`;

const CategoryItemWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
`;

const CategoryItem = styled.View`
  background-color: #fff;
  padding: 15px;
  margin: 10px;
  flex-basis: 45%;
`;

const FlexFooterColumn = styled.View<FlexColumnProps>`
  flex: ${(props: any) => props.flex};
  padding: 20px 20px;
`;

const FlexColumn = styled.View<FlexColumnProps>`
  flex: ${(props: any) => props.flex};
`;

const FlexColumnCenter = styled.View<FlexColumnProps>`
  flex: ${(props: any) => props.flex};
  justify-content: center;
`;

const FlexRow = styled.View<FlexColumnProps>`
  flex: ${(props: any) => props.flex};
  flex-direction: row;
`;

const VerticalGap = styled.View<GapProps>`
  width: ${(props: any) => props.gap}px;
`;

const HorizontalGap = styled.View<GapProps>`
  height: ${(props: any) => props.gap}px;
`;

const StyledText = styled.Text`
  font-size: 22px;
  font-weight: 700;
  line-height: 26px;
`;

const TitleText = styled.Text`
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  color: #7d7d7d;
`;

export {Categories};
