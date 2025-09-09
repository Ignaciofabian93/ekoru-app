"use client";
import { Calendar, Award, Eye, Save } from "lucide-react";
import MainLayout from "@/ui/layout/mainLayout";
import useSessionStore from "@/store/session";
import Modal from "@/ui/modals/modal";
import { motion } from "framer-motion";
import MainButton from "@/ui/buttons/mainButton";
import usePersonalInfoStore from "./_store/personalInfo";
import QuickActions from "./_ui/quickActions";
import ImpactSummary from "./_ui/impactSummary";
import RecentActivity from "./_ui/recentActivity";
import ProfileNavigation from "./_ui/profileNavigation";
import ProfileHeader from "./_ui/profileHeader";

export default function ProfilePage() {
  const { data } = useSessionStore();
  const { isOpen, onClose, openModal } = usePersonalInfoStore();
  console.log("data:: ", data);

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-neutral-light/20 to-white">
        {/* Profile Header */}
        <ProfileHeader data={data!} />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Quick Actions & Stats */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Actions Grid */}
              <QuickActions />

              {/* Environmental Impact Summary */}
              <ImpactSummary />

              {/* Recent Activity */}
              <RecentActivity />
            </div>

            {/* Right Column - Profile Navigation & Additional Info */}
            <div className="space-y-8">
              {/* Profile Navigation */}
              <ProfileNavigation openModal={openModal} />

              {/* Achievement Badge */}
              <div className="bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">
                    Eco-Warrior Certificado
                  </h3>
                  <p className="text-white/80 text-sm mb-4">
                    Has ahorrado más de 100kg de CO₂ este mes. ¡Sigue así!
                  </p>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">
                        Progreso al siguiente nivel
                      </span>
                      <span className="text-sm font-medium">75%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-white h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-xl shadow-sm border border-neutral/20 p-6">
                <h3 className="text-lg font-bold text-text-primary mb-4">
                  Estadísticas
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted">Perfil visitado</span>
                    <div className="flex items-center text-text-primary">
                      <Eye className="w-4 h-4 mr-1" />
                      <span className="font-medium">1,247 veces</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted">Miembro desde</span>
                    <div className="flex items-center text-text-primary">
                      <Calendar className="w-4 h-4 mr-1" />
                      {/* <span className="font-medium">{user.joinDate}</span> */}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted">Reseñas escritas</span>
                    <div className="flex items-center text-text-primary">
                      <Award className="w-4 h-4 mr-1" />
                      <span className="font-medium">23</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={"Editar Perfil"}
        size="lg"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="space-y-6"
        >
          <div className="text-sm text-gray-600">
            {"Update the product information below."}
          </div>
          <p>jashsjhasjas</p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="flex justify-end space-x-3 pt-4 border-t border-gray-200"
          >
            <MainButton
              text="Cancelar"
              onClick={onClose}
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
    </MainLayout>
  );
}
