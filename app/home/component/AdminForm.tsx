import Modal from "./modal";
import Input from "./form/input";
import Select from "./form/select";
import Button from "./form/button";
import { AdminFormData } from "../dashboard/admin/hook/useAdminData";

interface AdminFormProps {
    isSubmitting: boolean;
    isOpen: boolean;
    isEditing?: boolean;
    formData: AdminFormData;
    onSubmit:() => void;
    onClose:()=> void;
    setFormData: React.Dispatch<React.SetStateAction<AdminFormData>>;
}

const AdminForm: React.FC<AdminFormProps> = ({
  isSubmitting,
    onSubmit,
    onClose,
    setFormData,
    isOpen,
    isEditing,
    formData,
}) => {

    if(!isOpen) return null;
    
    const handleInputChange = (field: keyof AdminFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };
 
    return(
        <Modal onClose={onClose} title={isEditing ? "ແກ້ໄຂ Admin" : "ເພີ່ມ Admin"} size="md">
         <form className="space-y-4" >
        <Input
          label="ຊື່"
          value={formData.name}
          name="name"
          onChange={handleInputChange('name')}
          placeholder="Enter name"
        />
        
        <Input
          label="ຊື່ຜູ້ນຳໃຊ້"
          value={formData.username}
          name="username"
          onChange={handleInputChange('username')}
          placeholder="Enter username"
        />
        
        <Select
          label="ລະດັບ"
          name="level"
          value={formData.level}
          onChange={handleInputChange('level')}
        >
          <option value="Administrator">Administrator</option>
          <option value="Editor">Editor</option>
          <option value="SuperUser">SuperUser</option>
        </Select>
        
        <Input
          type="password"
          label="ລະຫັດຜ່ານ"
          value={formData.password}
          name="password"
          onChange={handleInputChange('password')}
          placeholder="Enter password"
        />
        
        <Input
          type="password"
          label="ຢືນຢັນລະຫັດ"
          value={formData.confirmPassword}
          name="confirmPassword"
          onChange={handleInputChange('confirmPassword')}
          placeholder="Confirm password"
        />
         <div className="flex justify-end">
          <Button 
            label={isEditing ? "Update" : "Save"} 
            onClick={onSubmit}
            disabled={isSubmitting} 
          />
        </div>
        </form>
    </Modal>
    )
}
export default AdminForm;