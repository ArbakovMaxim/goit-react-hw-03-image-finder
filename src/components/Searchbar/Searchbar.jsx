import { Formik } from 'formik';
import {
  Header,
  SearchForm,
  FormBtn,
  SpanForm,
  InputForm,
  ImgForm,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const hendleSubmit = (values, { resetForm }) => {
    onSubmit(values.searchValue);
    resetForm();
  };
  return (
    <Header>
      <Formik initialValues={{ searchValue: '' }} onSubmit={hendleSubmit}>
        <SearchForm>
          <FormBtn type="submit">
            <ImgForm />
            <SpanForm>Searce</SpanForm>
          </FormBtn>

          <InputForm
            type="text"
            name="searchValue"
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Formik>
    </Header>
  );
};
