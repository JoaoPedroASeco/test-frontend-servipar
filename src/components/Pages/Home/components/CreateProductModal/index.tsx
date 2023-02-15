import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useContext,
  useState,
} from "react";

//Images
import CloseIcon from "../../../../../assets/close-icon.svg";

//Contexts
import { GeneralContext } from "@/contexts/GeneralContext";

//Styles
import { CustomModal } from "./styles";
import Image from "next/image";

//Libs
import { toast } from "react-toastify";
import * as yup from "yup";
import axios from "axios";

//Services
import { api } from "@/services/api";

//Coponents
import { ThemeInput } from "@/components/General/Input";
import { ThemeButton } from "@/components/General/Button";

//Schema
const schema = yup.object().shape({
  name: yup
    .string()
    .required("Nome é um campo obrigatorio!")
    .min(3, "Nome invalido! tamanho minimo de 3 digitos."),
  cost: yup
    .number()
    .required("Preço é um campo obrigatorio!")
    .min(3, "Preço invalido! tamanho minimo de 3 digitos."),
  quantity: yup
    .number()
    .required("Quantidade é um campo obrigatorio!")
    .moreThan(0, "Quantidade invalida! tamanho minimo de 3 digitos."),
  locationId: yup
    .number()
    .required("Localidade é um campo obrigatorio!")
    .moreThan(0, "Localidade invalida! tamanho minimo de 3 digitos."),
  familyId: yup
    .number()
    .required("Familia é um campo obrigatorio!")
    .moreThan(0, "Familia invalida! tamanho minimo de 3 digitos."),
});

//Types
type FormData = {
  name: string;
  cost: number;
  quantity: number;
  locationId: number;
  familyId: number;
};

export const CreateProductModal = () => {
  const {
    isCreateProductModalOpen,
    setIsCreateProductModalOpen,
    families,
    locations,
    paginationsOps,
    productsLength,
    pagesAmount,
    setProducts,
    setPagesAmount,
    products,
    token,
    setProductsLength,
  } = useContext(GeneralContext);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    cost: 0,
    quantity: 0,
    locationId: 0,
    familyId: 0,
  });

  const [formErrors, setFormErrors] = useState<{
    name?: string;
    cost?: string;
    quantity?: string;
    locationId?: string;
    familyId?: string;
  }>({});

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    },
    [formData]
  );

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        const validatedFormData = await schema.validate(formData, {
          abortEarly: false,
        });

        const { data } = await api.post("/products", validatedFormData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFormData({
          name: "",
          cost: 0,
          quantity: 0,
          locationId: 0,
          familyId: 0,
        });

        if (productsLength + 1 <= parseInt(paginationsOps.limit)) {
          setProducts([...products, data]);
          setProductsLength(productsLength + 1);
        } else {
          setPagesAmount(pagesAmount + 1);
        }

        setIsCreateProductModalOpen(false);
        return toast.success("Sucesso no cadastro de produto!");
      } catch (error: any) {
        if (error?.inner) {
          const errorObject = error.inner.reduce((errors: any, err: any) => {
            errors[err.path] = err.message;
            return errors;
          }, {});
          setFormErrors(errorObject);

          return;
        }
        console.log(error);
        if (axios.isAxiosError(error)) {
          console.log("error", error);
          return toast.error("Erro no cadastro de produto!");
        } else {
          return toast.error("Erro interno, tente novamente");
        }
      }
    },
    [
      formData,
      setIsCreateProductModalOpen,
      paginationsOps,
      products,
      productsLength,
      setProducts,
      token,
      pagesAmount,
      setPagesAmount,
      setProductsLength
    ]
  );

  return (
    <CustomModal
      isOpen={isCreateProductModalOpen}
      onRequestClose={() => setIsCreateProductModalOpen(false)}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={() => setIsCreateProductModalOpen(false)}
        className="react-modal-close"
      >
        <Image src={CloseIcon} alt="close" />
      </button>

      <form onSubmit={handleSubmit}>
        <h2>
          <span>Cadastro</span> de produto
        </h2>

        <ThemeInput
          name="name"
          id="name"
          label="Nome"
          placeholder="Digite o nome do produto"
          onChange={handleChange}
          value={formData.name}
          error={formErrors.name}
        />

        <ThemeInput
          name="cost"
          id="cost"
          label="Preço"
          placeholder="Digite o preço do produto"
          onChange={handleChange}
          value={formData.cost}
          error={formErrors.cost}
        />

        <ThemeInput
          name="quantity"
          id="quantity"
          label="Quantidade"
          type="number"
          placeholder="Digite o nome do produto"
          onChange={handleChange}
          value={formData.quantity}
          error={formErrors.quantity}
        />

        <ThemeInput
          name="familyId"
          id="familyId"
          type="select"
          label="Familia"
          onChange={handleChange}
          value={formData.familyId}
          error={formErrors.familyId}
        >
          {families?.map((family) => (
            <option key={family.id} value={family.id}>
              {family.name}
            </option>
          ))}
        </ThemeInput>

        <ThemeInput
          name="locationId"
          id="locationId"
          type="select"
          label="Localidade"
          onChange={handleChange}
          value={formData.locationId}
          error={formErrors.locationId}
        >
          {locations?.map((family) => (
            <option key={family.id} value={family.id}>
              {family.name}
            </option>
          ))}
        </ThemeInput>

        <div className="footer">
          <ThemeButton
            type="submit"
            style={{
              padding: "0 2rem",
            }}
          >
            Cadastrar
          </ThemeButton>

          <ThemeButton
            type="button"
            style={{
              padding: "0 2rem",
              backgroundColor: "#FD5E5E",
            }}
            onclick={() => setIsCreateProductModalOpen(false)}
          >
            Cancelar
          </ThemeButton>
        </div>
      </form>
    </CustomModal>
  );
};
