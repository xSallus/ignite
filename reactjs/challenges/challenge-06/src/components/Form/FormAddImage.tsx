/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

interface FormAddImageProps {
  closeModal: () => void;
}

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();

  const formValidations = {
    image: {
      // TODO: REQUIRED, LESS THAN 10 MB AND ACCEPTED FORMATS VALIDATIONS
    },
    title: {
      // TODO: REQUIRED, MIN AND MAX LENGTH VALIDATIONS
    },
    description: {
      // TODO: REQUIRED, MAX LENGTH VALIDATIONS
    },
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    // TODO: MUTATION API POST REQUEST,
		async (data: any) => {
			await api.post('http://localhost:3000/api/images', data);
		},
    {
			onSuccess: () => {
				toast({
					status: 'success',
					title: 'Imagem cadastrada',
					description: 'Sua imagem foi cadastrada com sucesso',
					duration: 3000,
					isClosable: false,    
				});

				queryClient.invalidateQueries('images')
			}
    }
  );

  const { register, handleSubmit, reset, formState, setError, trigger } =
    useForm();
  const { errors } = formState;

  const onSubmit = async (data: Record<string, unknown>): Promise<void> => {
    const emptyState = '';
    try {
      const newData = {
        ...data,
        url: imageUrl,
      };

      //await api.post('http://localhost:3000/api/images', newData);

      if (!imageUrl.length) {
        toast({
          status: 'error',
          title: 'Imagem nao adicionada',
          description:
            'E preciso adicionar e aguardar o upload da imagem antes de realizar o cadastro',
          duration: 3000,
          isClosable: false,
        });
        return;
      }
      // TODO: EXECUTE ASYNC MUTATION
			await mutation.mutateAsync(newData)
      /*toast({
        status: 'success',
        title: 'Imagem cadastrada',
        description: 'Sua imagem foi cadastrada com sucesso',
        duration: 3000,
        isClosable: false,
      });*/
    } catch {
      toast({
        status: 'error',
        title: 'Falha no cadastro',
        description: 'Ocorreu um erro ao cadastrar a sua imagem',
        duration: 3000,
        isClosable: false,
      });
    } finally {
      reset();
      setImageUrl(emptyState);
      setLocalImageUrl(emptyState);
      closeModal();
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          // TODO: SEND IMAGE ERRORS
          // TODO: REGISTER IMAGE INPUT WITH VALIDATIONS
          {...register('image')}
        />

        <TextInput
          placeholder="Título da imagem..."
          // TODO: SEND TITLE ERRORS
          // TODO: REGISTER TITLE INPUT WITH VALIDATIONS
          {...register('title')}
        />

        <TextInput
          placeholder="Descrição da imagem..."
          // TODO: SEND DESCRIPTION ERRORS
          // TODO: REGISTER DESCRIPTION INPUT WITH VALIDATIONS
          {...register('description')}
        />
      </Stack>

      <Button
        as="button"
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
