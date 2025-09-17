import { motion } from "motion/react";
import { Save } from "lucide-react";
import { profileMenu } from "../_constants/data";
import clsx from "clsx";
import Link from "next/link";
import useProfileForm from "../_hooks/useProfileForm";
import Modal from "@/ui/modals/modal";
import MainButton from "@/ui/buttons/mainButton";
import UserForm from "./forms/userForm";

export default function ProfileNavigation() {
  const {
    form,
    isOpen,
    openModal,
    closeModal,
    countiesData,
    regionsData,
    citiesData,
    countriesData,
    countiesLoading,
    countriesLoading,
    regionsLoading,
    citiesLoading,
    updateCountry,
    updateRegion,
    updateCity,
    updateCounty,
    handleUpdateUser,
    updatePreferredContactMethod,
    handleUpdateProfile,
    handleBirthdayChange,
    validateBirthdayField,
  } = useProfileForm();

  return (
    <section className="bg-white rounded-xl shadow-sm border border-neutral/20 p-6">
      <h3 className="text-lg font-bold text-text-primary mb-4">
        Gestionar Perfil
      </h3>
      <nav className="space-y-2">
        {profileMenu.map((item) => {
          const IconComponent = item.icon;
          if (item.name === "personalInfo") {
            return (
              <button
                key={item.name}
                onClick={openModal}
                className={clsx(
                  "flex w-full items-center p-3 rounded-lg hover:bg-neutral-light/50 transition-colors group",
                  {
                    "opacity-50 pointer-events-none": !item.enabled,
                  }
                )}
              >
                <IconComponent className="w-5 h-5 mr-3 text-neutral group-hover:text-primary transition-colors" />
                <span className="font-medium text-text-secondary group-hover:text-primary transition-colors">
                  {item.title}
                </span>
              </button>
            );
          } else {
            return (
              <Link
                key={item.title}
                href={item.href}
                className={clsx(
                  "flex items-center p-3 rounded-lg hover:bg-neutral-light/50 transition-colors group",
                  {
                    "opacity-50 pointer-events-none": !item.enabled,
                  }
                )}
              >
                <IconComponent className="w-5 h-5 mr-3 text-neutral group-hover:text-primary transition-colors" />
                <span className="font-medium text-text-secondary group-hover:text-primary transition-colors">
                  {item.title}
                </span>
              </Link>
            );
          }
        })}
      </nav>
      <Modal
        key={"profile-modal"}
        isOpen={isOpen}
        onClose={closeModal}
        title={"Editar Perfil"}
        size="lg"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="space-y-6"
        >
          {/* MODAL CONTENT - FORM */}
          <div className="text-sm text-gray-600">
            <UserForm
              formData={form}
              onChange={() => {}}
              countries={countriesData}
              regions={regionsData}
              cities={citiesData}
              counties={countiesData}
              handleSubmit={() => {
                console.log("Form submitted");
                console.log("Form data: ", form);
              }}
              countiesLoading={countiesLoading}
              citiesLoading={citiesLoading}
              regionsLoading={regionsLoading}
              countriesLoading={countriesLoading}
              updateCountry={updateCountry}
              updateRegion={updateRegion}
              updateCity={updateCity}
              updateCounty={updateCounty}
              handleUpdateUser={handleUpdateUser}
              updatePreferredContactMethod={updatePreferredContactMethod}
              handleUpdateProfile={handleUpdateProfile}
              handleBirthdayChange={handleBirthdayChange}
              validateBirthdayField={validateBirthdayField}
            />
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4 border-t border-gray-200"
          >
            <MainButton
              text="Cancelar"
              onClick={closeModal}
              disabled={false}
              variant="outline"
              hasIcon={false}
            />
            <MainButton
              text={"Actualizar Perfil"}
              variant="primary"
              onClick={() => {
                console.log("Main button clicked");
              }}
              hasIcon
              icon={Save}
            />
          </motion.div>
        </motion.div>
      </Modal>
    </section>
  );
}
