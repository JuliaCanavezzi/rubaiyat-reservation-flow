
import React, { useState } from 'react';
import { Calendar, Clock, Users, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>('');
  const [people, setPeople] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const handleReservation = () => {
    if (!date || !time || !people) {
      toast({
        title: "Please fill in all required fields",
        description: "Date, time, and number of people are required to make a reservation.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Reservation Submitted!",
      description: `Your reservation for ${people} people on ${format(date, 'PPP')} at ${time} has been submitted.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Navbar */}
      <nav className="fixed top-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16">
            <h1 className="text-2xl font-bold text-amber-800">Rubaiyat - Faria Lima</h1>
          </div>
        </div>
      </nav>

      {/* Hero Image */}
      <div className="pt-16 relative">
        <div className="h-96 bg-gradient-to-r from-amber-800 to-amber-600 relative overflow-hidden">
          <img 
            src="/lovable-uploads/fb07f858-3fa1-4fa3-a88b-adc170a6bb73.png" 
            alt="Fine dining experience at Rubaiyat"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-5xl font-bold mb-4">Experience Excellence</h2>
              <p className="text-xl">Reserve your table for an unforgettable culinary journey</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Side - Reservation Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Make Your Reservation</h3>
            
            <div className="space-y-6">
              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline w-4 h-4 mr-2" />
                  Date *
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      {date ? format(date, "PPP") : <span>Choose a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="inline w-4 h-4 mr-2" />
                  Time *
                </label>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="18:00">6:00 PM</SelectItem>
                    <SelectItem value="18:30">6:30 PM</SelectItem>
                    <SelectItem value="19:00">7:00 PM</SelectItem>
                    <SelectItem value="19:30">7:30 PM</SelectItem>
                    <SelectItem value="20:00">8:00 PM</SelectItem>
                    <SelectItem value="20:30">8:30 PM</SelectItem>
                    <SelectItem value="21:00">9:00 PM</SelectItem>
                    <SelectItem value="21:30">9:30 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Number of People */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="inline w-4 h-4 mr-2" />
                  Number of People *
                </label>
                <Select value={people} onValueChange={setPeople}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select party size" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4,5,6,7,8].map(num => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'Person' : 'People'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Special Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requests (Optional)
                </label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any special requests, dietary restrictions, or celebration details..."
                  rows={3}
                />
              </div>

              {/* Submit Button */}
              <Button 
                onClick={handleReservation}
                className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 text-lg transition-colors"
              >
                Finalize Reservation
              </Button>
            </div>
          </div>

          {/* Right Side - Restaurant Info */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-3xl font-bold text-amber-800 mb-6">Reserva Já</h3>
            
            <div className="space-y-6">
              {/* Restaurant Image */}
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500&h=300&fit=crop" 
                  alt="Rubaiyat Restaurant Interior"
                  className="w-full h-48 object-cover"
                />
              </div>

              {/* Restaurant Details */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-amber-700 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Address</h4>
                    <p className="text-gray-600">
                      Av. Brigadeiro Faria Lima, 2954<br />
                      Jardim Paulistano, São Paulo - SP<br />
                      01451-001
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-amber-700 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Phone</h4>
                    <p className="text-gray-600">(11) 3079-3001</p>
                  </div>
                </div>
              </div>

              {/* Restaurant Description */}
              <div className="bg-amber-50 p-4 rounded-lg">
                <h4 className="font-semibold text-amber-800 mb-2">About Rubaiyat</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Experience the finest cuts of meat and exceptional service in an elegant atmosphere. 
                  Our restaurant combines traditional techniques with modern culinary innovation to 
                  create an unforgettable dining experience in the heart of São Paulo.
                </p>
              </div>

              {/* Operating Hours */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Operating Hours</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Monday - Thursday</span>
                    <span>6:00 PM - 11:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Friday - Saturday</span>
                    <span>6:00 PM - 12:00 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>6:00 PM - 10:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
