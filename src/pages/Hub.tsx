
import { useNavigate } from 'react-router-dom';
import { HubLayout } from '../components/layout/HubLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Hotel, Home, Building2, Car } from 'lucide-react';

const modules = [
  {
    id: 'hospitality',
    title: 'Hospitality',
    description: 'Hotel & Apartment management. Self check-in, Digital Key, PMS Sync.',
    icon: Hotel,
    color: 'text-primary',
    bg: 'bg-primary/10',
    path: '/module/hospitality'
  },
  {
    id: 'residential',
    title: 'Residential',
    description: 'Housing complex management. Visitor Management, Gate Controller.',
    icon: Home,
    color: 'text-secondary',
    bg: 'bg-secondary/10',
    path: '/module/residential'
  },
  {
    id: 'commercial',
    title: 'Commercial',
    description: 'Office & Corporate access. Employee Access, Meeting Rooms, RBAC.',
    icon: Building2,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    path: '/module/commercial'
  },
  {
    id: 'parking',
    title: 'Parking',
    description: 'Parking area management. Live ANPR, Occupancy, Plate Management.',
    icon: Car,
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10',
    path: '/module/parking'
  }
];

export function Hub() {
  const navigate = useNavigate();

  return (
    <HubLayout>
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-surface via-background to-background">
        <div className="max-w-5xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white">
              Select Workspace
            </h1>
            <p className="text-textSecondary text-lg max-w-2xl mx-auto">
              Choose a module to access specific management tools and dashboards for your properties.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules.map((mod) => (
              <Card 
                key={mod.id}
                className="group cursor-pointer hover:border-primary/50 hover:shadow-[0_0_30px_-5px_rgba(0,230,118,0.15)] transition-all duration-300 hover:-translate-y-1 bg-surface/80 backdrop-blur"
                onClick={() => navigate(mod.path)}
              >
                <CardHeader className="pb-4">
                  <div className={`w-14 h-14 rounded-2xl ${mod.bg} ${mod.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <mod.icon className="w-7 h-7" />
                  </div>
                  <CardTitle className="text-xl">{mod.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {mod.description}
                  </CardDescription>
                </CardContent>
                <div className="px-6 pb-6 mt-auto">
                  <div className="text-sm font-medium text-primary flex items-center opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">
                    Open Module →
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </HubLayout>
  );
}
