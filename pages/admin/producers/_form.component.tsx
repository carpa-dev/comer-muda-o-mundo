import React, { useState } from 'react';
import { Formik, FormikTouched, FormikErrors } from 'formik';
import {
  Grid,
  TextField,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';

import LoadingButton from '@components/LoadingButton';
import SearchBar from '@containers/SearchBar';
import '@styles/search-bar.css';
import { Producer, NewProducer, NewProducerSchema } from '@models/producer';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

//@ts-ignore
import { mdToDraftjs, draftjsToMd } from 'draftjs-md-converter';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
    mapWrapper: {
      width: '100%',
      height: 300,
    },
    editorWrapper: {
      marginBottom: `${theme.spacing(2)}px`,
    },
    editor: {
      borderWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.26)',
      borderStyle: 'solid',
      borderRadius: '4px',

      padding: `${theme.spacing(2)}px`,
    },
    toolbarEditor: {
      borderWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.26)',
      borderStyle: 'solid',
      borderRadius: '4px',
    },
  })
);

export default function ProducerForm({
  initialState,
  onSave,
}: {
  initialState?: Producer;
  onSave: (newProducer: any) => void; // TODO: type
}) {
  const classes = useStyles();
  const editorFirstContent =
    initialState && initialState.post
      ? EditorState.createWithContent(
          convertFromRaw(mdToDraftjs(initialState.post))
        )
      : EditorState.createEmpty();

  const [editorState, setEditorState] = useState(editorFirstContent);

  return (
    <Formik
      initialValues={
        initialState
          ? initialState
          : {
              name: '',
              address: '',
              latitude: -9999,
              longitude: -9999,
              post: '',
            }
      }
      validationSchema={NewProducerSchema}
      onSubmit={onSave}
    >
      {({
        values,
        handleChange,
        errors,
        touched,
        handleSubmit,
        isSubmitting,
        setSubmitting,
        setFieldValue,
      }) => (
        <form
          onSubmit={async r => {
            await handleSubmit(r);

            setSubmitting(false);
          }}
          noValidate
          autoComplete="off"
          className={classes.container}
        >
          <TextField
            id="input-name"
            name="name"
            label="Nome"
            margin="normal"
            variant="outlined"
            value={values.name}
            error={!!(touched.name && errors.name)}
            onChange={handleChange}
            helperText={mountErrMsg(touched, errors, 'name')}
            fullWidth
            required
          />

          <div className="search-bar-wrapper">
            <SearchBar
              onPlaceChanged={v => {
                setFieldValue('latitude', v.latitude);
                setFieldValue('longitude', v.longitude);
                setFieldValue('address', v.address);
              }}
            ></SearchBar>
          </div>

          <TextField
            id="address"
            label="Endereço Amigável"
            margin="normal"
            variant="outlined"
            value={values.address}
            onChange={handleChange}
            error={!!(touched.address && errors.address)}
            helperText={mountErrMsg(
              touched,
              errors,
              'address',
              'Que será mostrado ao usuário'
            )}
            fullWidth
            required
          />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                id="input-latitude"
                margin="normal"
                label="Latitude"
                variant="outlined"
                value={values.latitude}
                error={!!(touched.latitude && errors.latitude)}
                helperText={mountErrMsg(touched, errors, 'latitude')}
                disabled
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="input-longitude"
                label="Longitude"
                margin="normal"
                variant="outlined"
                value={values.longitude}
                error={!!(touched.longitude && errors.longitude)}
                helperText={mountErrMsg(touched, errors, 'longitude')}
                disabled
                fullWidth
                required
              />
            </Grid>
          </Grid>

          <Grid item xs={12} className={classes.editorWrapper}>
            <Editor
              editorState={editorState}
              editorClassName={classes.editor}
              toolbarClassName={classes.toolbarEditor}
              onEditorStateChange={es => {
                const content = es.getCurrentContent();

                setFieldValue('post', draftjsToMd(convertToRaw(content)));

                setEditorState(es);
              }}
              toolbar={{
                options: ['inline', 'blockType', 'list', 'link'],
                inline: {
                  options: ['bold', 'italic'],
                },
                blockType: {
                  options: ['Normal', 'H1', 'H2'],
                },
              }}
            />
          </Grid>

          <LoadingButton
            color="primary"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            fullWidth
          >
            Salvar
          </LoadingButton>
        </form>
      )}
    </Formik>
  );
}

function mountErrMsg(
  touched: FormikTouched<NewProducer>,
  errors: FormikErrors<NewProducer>,
  name: keyof NewProducer,
  defaultMsg = ' '
) {
  // return defaultMessage except when there's no an error
  // otherwise everytime error shows up
  // the content will be shifted
  if (touched[name] && errors[name]) {
    return errors[name];
  }

  return defaultMsg;
}
