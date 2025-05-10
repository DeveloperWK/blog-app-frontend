import ProfileField from "@/app/users/profile/ProfileField";
import { Briefcase, FileText, Flag } from "lucide-react";
const ProfessionalSection = ({
  profile,
  tempProfile,
  isEditing,
  onInputChange,
  roles,
  occupations,
}) => {
  return (
    <section className="mb-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-200">Professional</h2>

      <div className="space-y-4">
        {/* Role */}
        <ProfileField
          icon={FileText}
          label="Role"
          value={profile?.role}
          isEditing={isEditing}
        >
          <select
            name="role"
            onChange={onInputChange}
            value={tempProfile?.role}
            className="w-full bg-gray-700 border-gray-600 border rounded p-2 text-sm text-gray-200"
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </ProfileField>

        {/* Occupation */}
        <ProfileField
          icon={Briefcase}
          label="Occupation"
          value={profile?.occupation}
          isEditing={isEditing}
        >
          <select
            name="occupation"
            onChange={onInputChange}
            value={tempProfile?.occupation}
            className="w-full bg-gray-700 border-gray-600 border rounded p-2 text-sm text-gray-200"
          >
            {occupations?.map((occ) => (
              <option key={occ} value={occ}>
                {occ}
              </option>
            ))}
          </select>
        </ProfileField>

        {/* Country */}
        <ProfileField
          icon={Flag}
          label="Country"
          value={profile?.country}
          isEditing={isEditing}
        >
          <input
            type="text"
            name="country"
            value={tempProfile?.country}
            onChange={onInputChange}
            className="w-full bg-gray-700 border-gray-600 border rounded p-2 text-sm text-gray-200"
            placeholder="Country"
          />
        </ProfileField>
      </div>
    </section>
  );
};
export default ProfessionalSection;
