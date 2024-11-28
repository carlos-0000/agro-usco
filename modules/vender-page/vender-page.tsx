'use client';

import React, {useEffect} from 'react';
import { useRouter as useNavigation } from 'next/navigation';
import {
    IconAlertCircle,
    IconArrowLeft,
    IconArrowRight,
    IconCircleCheck,
    IconExclamationCircle,
    IconInfoCircle,
    IconPlus,
    IconTrash,
} from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Alert,
    Box,
    Button,
    Checkbox,
    Container,
    Group,
    NumberInput,
    Paper,
    Stack,
    Text,
    Title,
    Select,
    Textarea,
    FileButton,
    Image,
    Input,
} from '@mantine/core';
import {DateInput, DatePickerInput} from '@mantine/dates';
import classes from './vender-page.module.css';
import {api} from "@/lib/api";

enum Paso {
    InformacionBasica,
    DescripcionYFotos,
    DisponibilidadYStock,
    ConfiguracionDePrecios,
    SeleccionDeFinca,
    RevisionYConfirmacion,
}

enum Direction {
    Next = 'next',
    Back = 'back',
}

const variants = {
    enter: (d: Direction) => ({ x: d === Direction.Next ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: Direction) => ({ x: d === Direction.Next ? -300 : 300, opacity: 0 }),
};

export function VenderPage() {


    const navigation = useNavigation();

    const [[paso, direction], setPaso] = React.useState<[Paso, Direction]>([
        Paso.InformacionBasica,
        Direction.Next,
    ]);

    const [isLoading, setIsLoading] = React.useState(false);

    // State variables for the form data
    const [nombreProducto, setNombreProducto] = React.useState('');
    const [categoriaProducto, setCategoriaProducto] = React.useState('');
    const [tipoCultivo, setTipoCultivo] = React.useState('');

    const [descripcionProducto, setDescripcionProducto] = React.useState('');
    const [fotosProducto, setFotosProducto] = React.useState<File[]>([]);

    const [unidadMedida, setUnidadMedida] = React.useState('');
    const [stockDisponible, setStockDisponible] = React.useState<number | undefined>();
    const [fechaDisponibilidad, setFechaDisponibilidad] = React.useState<Date | null>(null);

    const [rangosPrecios, setRangosPrecios] = React.useState<
        { cantidadMinima: number; precioPorUnidad: number; precioTotal: number }[]
    >([]);

    const [cantidadMinima, setCantidadMinima] = React.useState<number | undefined>();
    const [precioPorUnidad, setPrecioPorUnidad] = React.useState<number | undefined>();

    const [fincaSeleccionada, setFincaSeleccionada] = React.useState('');
    const [crearNuevaFinca, setCrearNuevaFinca] = React.useState(false);
    const [nombreFinca, setNombreFinca] = React.useState('');
    const [departamento, setDepartamento] = React.useState('');
    const [ciudad, setCiudad] = React.useState('');
    const [direccionExacta, setDireccionExacta] = React.useState('');

    const [categories, setCategories] = React.useState<{ value: string; label: string }[]>([]);
    const [cultivationTypes, setCultivationTypes] = React.useState<{ value: string; label: string }[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = React.useState<string>('');
    const [selectedCultivationTypeId, setSelectedCultivationTypeId] = React.useState<string>('');

    // Estado para unidades de medida
    const [unitsOfMeasure, setUnitsOfMeasure] = React.useState<{ value: string; label: string }[]>([]);
    const [selectedUnitId, setSelectedUnitId] = React.useState<string>('');

    const [alert, setAlert] = React.useState<{
        type: 'success' | 'error' | 'warning' | 'info';
        title: string;
        message: string;
    } | null>(null);

    const motionDivProps: React.ComponentProps<typeof motion.div> = {
        custom: direction,
        variants,
        initial: 'enter',
        animate: 'center',
        exit: 'exit',
        transition: { duration: 0.3 },
        style: { width: '100%' },
    };

    const nextButtonText = React.useMemo(
        () =>
            ({
                [Paso.InformacionBasica]: 'Siguiente',
                [Paso.DescripcionYFotos]: 'Siguiente',
                [Paso.DisponibilidadYStock]: 'Siguiente',
                [Paso.ConfiguracionDePrecios]: 'Siguiente',
                [Paso.SeleccionDeFinca]: 'Siguiente',
                [Paso.RevisionYConfirmacion]: 'Publicar Producto',
            })[paso],
        [paso]
    );
    // Categorías[
    // {
    //     "id": 1,
    //     "name": "Granos",
    //     "parentId": null,
    //     "subcategories": []
    // }
    // 	"cultivationTypes": [
    // 		{
    // 			"id": 1,
    // 			"name": "Convencional"
    // 		},
    // 		{
    // 			"id": 2,
    // 			"name": "Orgánico"
    // 		}
    // 	]
    useEffect(() => {
        // Obtener categorías
        api.get('/categories')
            .then(({ data }) => {
                const categoryOptions = data.categories.map((category: any) => ({
                    value: category.id.toString(),
                    label: category.name,
                }));
                setCategories(categoryOptions);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });

        // Obtener tipos de cultivo
        api.get('/cultivation-types')
            .then(({ data }) => {
                const cultivationTypeOptions = data.cultivationTypes.map((type: any) => ({
                    value: type.id.toString(),
                    label: type.name,
                }));
                setCultivationTypes(cultivationTypeOptions);
            })
            .catch((error) => {
                console.error('Error fetching cultivation types:', error);
            });
        api.get('/units-of-measure')
            .then(({ data }) => {
                const unitsOptions = data.units.map((unit: any) => ({
                    value: unit.id.toString(),
                    label: unit.name,
                }));
                setUnitsOfMeasure(unitsOptions);
            })
            .catch((error) => {
                console.error('Error fetching units of measure:', error);
            });
    }, []);


    const handleSubmit = () => {
        const productData = {
            name: nombreProducto,
            categoryId: parseInt(selectedCategoryId, 10),
            cultivationTypeId: parseInt(selectedCultivationTypeId, 10),
            // ... otros campos
        };

        api.post('/products', productData)
            .then((response) => {
                // Manejar respuesta exitosa
            })
            .catch((error) => {
                // Manejar errores
            });
    };

    const nextButtonAction = React.useCallback(() => {
        (
            {
                [Paso.InformacionBasica]() {
                    // Validations
                    if (!nombreProducto.trim() || !categoriaProducto || !tipoCultivo) {
                        setAlert({
                            type: 'error',
                            title: 'Error',
                            message: 'Por favor complete todos los campos requeridos.',
                        });
                        return;
                    }
                    setPaso([Paso.DescripcionYFotos, Direction.Next]);
                },
                [Paso.DescripcionYFotos]() {
                    // Validations
                    if (!descripcionProducto.trim()) {
                        setAlert({
                            type: 'error',
                            title: 'Error',
                            message: 'Por favor ingrese una descripción del producto.',
                        });
                        return;
                    }
                    if (fotosProducto.length === 0) {
                        setAlert({
                            type: 'error',
                            title: 'Error',
                            message: 'Por favor cargue al menos una imagen del producto.',
                        });
                        return;
                    }
                    setPaso([Paso.DisponibilidadYStock, Direction.Next]);
                },
                [Paso.DisponibilidadYStock]() {
                    if (!unidadMedida || !stockDisponible || !fechaDisponibilidad) {
                        setAlert({
                            type: 'error',
                            title: 'Error',
                            message: 'Por favor complete todos los campos requeridos.',
                        });
                        return;
                    }
                    setPaso([Paso.ConfiguracionDePrecios, Direction.Next]);
                },
                [Paso.ConfiguracionDePrecios]() {
                    if (rangosPrecios.length === 0) {
                        setAlert({
                            type: 'error',
                            title: 'Error',
                            message: 'Por favor agregue al menos un rango de precios.',
                        });
                        return;
                    }
                    setPaso([Paso.SeleccionDeFinca, Direction.Next]);
                },
                [Paso.SeleccionDeFinca]() {
                    if (!fincaSeleccionada && !crearNuevaFinca) {
                        setAlert({
                            type: 'error',
                            title: 'Error',
                            message: 'Por favor seleccione una finca o cree una nueva.',
                        });
                        return;
                    }
                    if (crearNuevaFinca) {
                        if (
                            !nombreFinca.trim() ||
                            !departamento ||
                            !ciudad.trim() ||
                            !direccionExacta.trim()
                        ) {
                            setAlert({
                                type: 'error',
                                title: 'Error',
                                message: 'Por favor complete todos los campos de la nueva finca.',
                            });
                            return;
                        }
                    }
                    setPaso([Paso.RevisionYConfirmacion, Direction.Next]);
                },
                [Paso.RevisionYConfirmacion]() {
                    // Simulate publishing the product
                    setIsLoading(true);
                    setTimeout(() => {
                        setIsLoading(false);
                        setAlert({
                            type: 'success',
                            title: 'Producto publicado',
                            message: 'El producto se ha publicado exitosamente.',
                        });
                        // Reset form
                        setNombreProducto('');
                        setCategoriaProducto('');
                        setTipoCultivo('');
                        setDescripcionProducto('');
                        setFotosProducto([]);
                        setUnidadMedida('');
                        setStockDisponible(undefined);
                        setFechaDisponibilidad(null);
                        setRangosPrecios([]);
                        setCantidadMinima(undefined);
                        setPrecioPorUnidad(undefined);
                        setFincaSeleccionada('');
                        setCrearNuevaFinca(false);
                        setNombreFinca('');
                        setDepartamento('');
                        setCiudad('');
                        setDireccionExacta('');
                        setPaso([Paso.InformacionBasica, Direction.Next]);
                    }, 2000);
                },
            } as Record<Paso, () => void>
        )[paso]();
    }, [
        paso,
        nombreProducto,
        categoriaProducto,
        tipoCultivo,
        descripcionProducto,
        fotosProducto,
        unidadMedida,
        stockDisponible,
        fechaDisponibilidad,
        rangosPrecios,
        fincaSeleccionada,
        crearNuevaFinca,
        nombreFinca,
        departamento,
        ciudad,
        direccionExacta,
    ]);

    const backButtonAction = React.useCallback(() => {
        (
            {
                [Paso.InformacionBasica]() {
                    // Can't go back
                },
                [Paso.DescripcionYFotos]() {
                    setPaso([Paso.InformacionBasica, Direction.Back]);
                },
                [Paso.DisponibilidadYStock]() {
                    setPaso([Paso.DescripcionYFotos, Direction.Back]);
                },
                [Paso.ConfiguracionDePrecios]() {
                    setPaso([Paso.DisponibilidadYStock, Direction.Back]);
                },
                [Paso.SeleccionDeFinca]() {
                    setPaso([Paso.ConfiguracionDePrecios, Direction.Back]);
                },
                [Paso.RevisionYConfirmacion]() {
                    setPaso([Paso.SeleccionDeFinca, Direction.Back]);
                },
            } as Record<Paso, () => void>
        )[paso]();
    }, [paso]);

    React.useEffect(() => {
        setAlert(null);
        setIsLoading(false);
    }, [paso]);

    return (
        <Container size={600} my={30}>
            <Title className={classes.title} ta="center">
                Vender Producto
            </Title>
            <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
                {paso !== Paso.InformacionBasica && (
                    <Button
                        leftSection={<IconArrowLeft size={18} />}
                        variant="subtle"
                        size="compact-md"
                        onClick={() => {
                            backButtonAction();
                        }}
                        mb="md"
                    >
                        Volver
                    </Button>
                )}
                {alert ? (
                    <Alert
                        color={alert.type}
                        icon={
                            {
                                info: <IconInfoCircle />,
                                success: <IconCircleCheck />,
                                error: <IconExclamationCircle />,
                                warning: <IconAlertCircle />,
                            }[alert.type]
                        }
                        title={alert.title}
                        withCloseButton
                        onClose={() => setAlert(null)}
                        mb="md"
                    >
                        {alert.message}
                    </Alert>
                ) : null}
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div key={paso} {...motionDivProps}>
                        <Stack>
                            {
                                {
                                    [Paso.InformacionBasica]: (
                                        <>
                                            <Text size="lg" weight="bold">
                                                Información Básica del Producto
                                            </Text>
                                            <Input.Wrapper label="Nombre del Producto" required>
                                                <Input
                                                    value={nombreProducto}
                                                    onChange={(e) => setNombreProducto(e.target.value)}
                                                    maxLength={100}
                                                />
                                            </Input.Wrapper>
                                            <Select
                                                label="Categoría del Producto"
                                                placeholder="Selecciona una categoría"
                                                required
                                                data={categories}
                                                value={selectedCategoryId}
                                                onChange={(value) => setSelectedCategoryId(value)}
                                            />
                                            <Select
                                                label="Tipo de Cultivo"
                                                placeholder="Selecciona el tipo de cultivo"
                                                required
                                                data={cultivationTypes}
                                                value={selectedCultivationTypeId}
                                                onChange={(value) => setSelectedCultivationTypeId(value)}
                                            />
                                        </>
                                    ),
                                    [Paso.DescripcionYFotos]: (
                                        <>
                                            <Text size="lg" weight="bold">
                                                Descripción y Fotos del Producto
                                            </Text>
                                            <Textarea
                                                label="Descripción del Producto"
                                                placeholder="Ingresa una descripción"
                                                required
                                                minRows={3}
                                                maxRows={6}
                                                maxLength={500}
                                                value={descripcionProducto}
                                                onChange={(e) => setDescripcionProducto(e.target.value)}
                                            />
                                            <FileButton
                                                onChange={(files) => {
                                                    if (files.length + fotosProducto.length > 3) {
                                                        setAlert({
                                                            type: 'error',
                                                            title: 'Error',
                                                            message: 'Puedes cargar un máximo de 3 imágenes.',
                                                        });
                                                        return;
                                                    }
                                                    setFotosProducto([...fotosProducto, ...files]);
                                                }}
                                                accept="image/png,image/jpeg"
                                                multiple
                                                disabled={fotosProducto.length >= 3}
                                            >
                                                {(props) => (
                                                    <Button {...props}>
                                                        {fotosProducto.length >= 3
                                                            ? 'Límite de imágenes alcanzado'
                                                            : 'Cargar Fotos del Producto (hasta 3 imágenes)'}
                                                    </Button>
                                                )}
                                            </FileButton>
                                            {fotosProducto.length > 0 && (
                                                <Group mt="sm">
                                                    {fotosProducto.map((file, index) => (
                                                        <Box key={index} pos="relative">
                                                            <Image
                                                                src={URL.createObjectURL(file)}
                                                                width={100}
                                                                height={100}
                                                                withPlaceholder
                                                            />
                                                            <Button
                                                                size="xs"
                                                                color="red"
                                                                variant="filled"
                                                                pos="absolute"
                                                                top={0}
                                                                right={0}
                                                                onClick={() => {
                                                                    setFotosProducto(
                                                                        fotosProducto.filter((_, i) => i !== index)
                                                                    );
                                                                }}
                                                            >
                                                                <IconTrash size={16} />
                                                            </Button>
                                                        </Box>
                                                    ))}
                                                </Group>
                                            )}
                                        </>
                                    ),
                                    [Paso.DisponibilidadYStock]: (
                                        <>
                                            <Text size="lg" weight="bold">
                                                Disponibilidad, Stock y Unidad de Medida
                                            </Text>
                                            <Select
                                                label="Unidad de Medida"
                                                placeholder="Selecciona una unidad"
                                                required
                                                data={['Kilo (kg)', 'Unidad', 'Litro (L)', 'Caja']}
                                                value={unidadMedida}
                                                onChange={setUnidadMedida}
                                            />
                                            <NumberInput
                                                label="Stock Disponible"
                                                placeholder="Ingresa la cantidad total disponible"
                                                required
                                                min={1}
                                                value={stockDisponible}
                                                onChange={(value) => setStockDisponible(value)}
                                            />
                                            <DateInput
                                                value={fechaDisponibilidad}
                                                onChange={(date) => setFechaDisponibilidad(date)}
                                                label="Date input"
                                                placeholder="Date input"
                                            />
                                        </>
                                    ),
                                    [Paso.ConfiguracionDePrecios]: (
                                        <>
                                            <Text size="lg" weight="bold">
                                                Configuración de Precios por Rango de Cantidad
                                            </Text>
                                            <NumberInput
                                                label="Cantidad Mínima"
                                                placeholder="Ingresa la cantidad mínima"
                                                min={1}
                                                value={cantidadMinima}
                                                onChange={(value) => setCantidadMinima(value)}
                                            />
                                            <NumberInput
                                                label="Precio por Unidad"
                                                placeholder="Ingresa el precio por unidad"
                                                min={0.01}
                                                precision={2}
                                                value={precioPorUnidad}
                                                onChange={(value) => setPrecioPorUnidad(value)}
                                            />
                                            <Button
                                                leftSection={<IconPlus size={16} />}
                                                onClick={() => {
                                                    if (!cantidadMinima || !precioPorUnidad) {
                                                        setAlert({
                                                            type: 'error',
                                                            title: 'Error',
                                                            message:
                                                                'Por favor ingrese la cantidad mínima y el precio por unidad.',
                                                        });
                                                        return;
                                                    }
                                                    const precioTotalCalc =
                                                        (cantidadMinima || 0) * (precioPorUnidad || 0);
                                                    setRangosPrecios([
                                                        ...rangosPrecios,
                                                        {
                                                            cantidadMinima,
                                                            precioPorUnidad,
                                                            precioTotal: precioTotalCalc,
                                                        },
                                                    ]);
                                                    setCantidadMinima(undefined);
                                                    setPrecioPorUnidad(undefined);
                                                }}
                                            >
                                                Agregar Rango de Precio
                                            </Button>
                                            {rangosPrecios.length > 0 && (
                                                <Stack>
                                                    <Text size="md" weight="bold">
                                                        Rangos de Precio Creados
                                                    </Text>
                                                    {rangosPrecios.map((rango, index) => (
                                                        <Group key={index} position="apart">
                                                            <Text>
                                                                Cantidad Mínima: {rango.cantidadMinima}, Precio por
                                                                Unidad: {rango.precioPorUnidad.toFixed(2)}, Precio Total:{' '}
                                                                {rango.precioTotal.toFixed(2)}
                                                            </Text>
                                                            <Button
                                                                variant="subtle"
                                                                color="red"
                                                                onClick={() => {
                                                                    setRangosPrecios(
                                                                        rangosPrecios.filter((_, i) => i !== index)
                                                                    );
                                                                }}
                                                            >
                                                                <IconTrash size={16} />
                                                            </Button>
                                                        </Group>
                                                    ))}
                                                </Stack>
                                            )}
                                        </>
                                    ),
                                    [Paso.SeleccionDeFinca]: (
                                        <>
                                            <Text size="lg" weight="bold">
                                                Selección de Finca
                                            </Text>
                                            <Select
                                                label="Seleccionar Finca Existente"
                                                placeholder="Selecciona una finca"
                                                data={['Finca 1', 'Finca 2']}
                                                value={fincaSeleccionada}
                                                onChange={setFincaSeleccionada}
                                                disabled={crearNuevaFinca}
                                            />
                                            <Checkbox
                                                label="Crear Nueva Finca"
                                                checked={crearNuevaFinca}
                                                onChange={(event) =>
                                                    setCrearNuevaFinca(event.currentTarget.checked)
                                                }
                                            />
                                            {crearNuevaFinca && (
                                                <>
                                                    <Input.Wrapper label="Nombre de la Finca" required>
                                                        <Input
                                                            value={nombreFinca}
                                                            onChange={(e) => setNombreFinca(e.target.value)}
                                                            maxLength={100}
                                                        />
                                                    </Input.Wrapper>
                                                    <Select
                                                        label="Departamento"
                                                        placeholder="Selecciona el departamento"
                                                        required
                                                        data={['Departamento 1', 'Departamento 2']}
                                                        value={departamento}
                                                        onChange={setDepartamento}
                                                    />
                                                    <Input.Wrapper label="Ciudad" required>
                                                        <Input
                                                            value={ciudad}
                                                            onChange={(e) => setCiudad(e.target.value)}
                                                            maxLength={100}
                                                        />
                                                    </Input.Wrapper>
                                                    <Input.Wrapper label="Dirección Exacta" required>
                                                        <Input
                                                            value={direccionExacta}
                                                            onChange={(e) => setDireccionExacta(e.target.value)}
                                                            maxLength={200}
                                                        />
                                                    </Input.Wrapper>
                                                </>
                                            )}
                                        </>
                                    ),
                                    [Paso.RevisionYConfirmacion]: (
                                        <>
                                            <Text size="lg" weight="bold">
                                                Revisión y Confirmación
                                            </Text>
                                            <Text>
                                                <strong>Nombre del Producto:</strong> {nombreProducto}
                                            </Text>
                                            <Text>
                                                <strong>Categoría:</strong> {categoriaProducto}
                                            </Text>
                                            <Text>
                                                <strong>Tipo de Cultivo:</strong> {tipoCultivo}
                                            </Text>
                                            <Text>
                                                <strong>Descripción:</strong> {descripcionProducto}
                                            </Text>
                                            {fotosProducto.length > 0 && (
                                                <Group mt="sm">
                                                    {fotosProducto.map((file, index) => (
                                                        <Image
                                                            key={index}
                                                            src={URL.createObjectURL(file)}
                                                            width={100}
                                                            height={100}
                                                            withPlaceholder
                                                        />
                                                    ))}
                                                </Group>
                                            )}
                                            <Text>
                                                <strong>Unidad de Medida:</strong> {unidadMedida}
                                            </Text>
                                            <Text>
                                                <strong>Stock Disponible:</strong> {stockDisponible}
                                            </Text>
                                            <Text>
                                                <strong>Fecha de Disponibilidad:</strong>{' '}
                                                {fechaDisponibilidad?.toLocaleDateString()}
                                            </Text>
                                            <Text size="md" weight="bold">
                                                Rangos de Precio:
                                            </Text>
                                            {rangosPrecios.map((rango, index) => (
                                                <Text key={index}>
                                                    Cantidad Mínima: {rango.cantidadMinima}, Precio por Unidad:{' '}
                                                    {rango.precioPorUnidad.toFixed(2)}, Precio Total:{' '}
                                                    {rango.precioTotal.toFixed(2)}
                                                </Text>
                                            ))}
                                            <Text>
                                                <strong>Finca Seleccionada:</strong>{' '}
                                                {crearNuevaFinca
                                                    ? `Nueva Finca: ${nombreFinca}, ${departamento}, ${ciudad}, ${direccionExacta}`
                                                    : fincaSeleccionada}
                                            </Text>
                                        </>
                                    ),
                                }[paso] ?? null
                            }
                        </Stack>
                    </motion.div>
                </AnimatePresence>
                <Group position="right" mt="md">
                    <Button
                        rightSection={<IconArrowRight size={16} />}
                        onClick={() => {
                            nextButtonAction();
                        }}
                        loading={isLoading}
                    >
                        {nextButtonText}
                    </Button>
                </Group>
            </Paper>
        </Container>
    );
}
