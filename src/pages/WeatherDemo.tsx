import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cloud, CloudRain, Sun, Wind, Droplets, 
  Thermometer, Eye, ArrowLeft, Search, MapPin,
  Calendar, CloudSnow, CloudLightning, CloudFog, CloudDrizzle, Moon
} from 'lucide-react';
import { Link } from 'react-router-dom';

// WMO Weather interpretation codes (https://open-meteo.com/en/docs)
const getWeatherIcon = (code: number, isDay: boolean = true) => {
  if (code === 0) return isDay ? <Sun className="w-full h-full text-yellow-400" /> : <Moon className="w-full h-full text-blue-200" />;
  if (code === 1 || code === 2 || code === 3) return <Cloud className="w-full h-full text-white" />;
  if (code === 45 || code === 48) return <CloudFog className="w-full h-full text-gray-300" />;
  if (code === 51 || code === 53 || code === 55 || code === 56 || code === 57) return <CloudDrizzle className="w-full h-full text-blue-300" />;
  if (code === 61 || code === 63 || code === 65 || code === 66 || code === 67) return <CloudRain className="w-full h-full text-blue-400" />;
  if (code === 71 || code === 73 || code === 75 || code === 77 || code === 85 || code === 86) return <CloudSnow className="w-full h-full text-white" />;
  if (code === 80 || code === 81 || code === 82) return <CloudRain className="w-full h-full text-blue-400" />;
  if (code === 95 || code === 96 || code === 99) return <CloudLightning className="w-full h-full text-yellow-300" />;
  return <Cloud className="w-full h-full text-white" />;
};

const getWeatherCondition = (code: number) => {
  if (code === 0) return 'Clear sky';
  if (code === 1) return 'Mainly clear';
  if (code === 2) return 'Partly cloudy';
  if (code === 3) return 'Overcast';
  if (code === 45 || code === 48) return 'Fog';
  if (code === 51 || code === 53 || code === 55) return 'Drizzle';
  if (code === 56 || code === 57) return 'Freezing Drizzle';
  if (code === 61 || code === 63 || code === 65) return 'Rain';
  if (code === 66 || code === 67) return 'Freezing Rain';
  if (code === 71 || code === 73 || code === 75) return 'Snow fall';
  if (code === 77) return 'Snow grains';
  if (code === 80 || code === 81 || code === 82) return 'Rain showers';
  if (code === 85 || code === 86) return 'Snow showers';
  if (code === 95) return 'Thunderstorm';
  if (code === 96 || code === 99) return 'Thunderstorm with hail';
  return 'Unknown';
};

export default function WeatherDemo() {
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [locationName, setLocationName] = useState('Loading location...');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (lat: number, lon: number, name: string) => {
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto`);
      if (!res.ok) throw new Error('Failed to fetch weather data');
      const data = await res.json();
      setWeatherData(data);
      setLocationName(name);
    } catch (err) {
      console.error(err);
      setError('Failed to load weather data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length < 3) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5&language=en&format=json`);
      const data = await res.json();
      if (data.results) {
        setSearchResults(data.results);
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  const selectLocation = (result: any) => {
    setSearchQuery('');
    setSearchResults([]);
    fetchWeather(result.latitude, result.longitude, `${result.name}${result.admin1 ? `, ${result.admin1}` : ''}, ${result.country_code}`);
  };

  useEffect(() => {
    // Get user's location on mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          // Try to reverse geocode to get city name
          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`);
            const data = await res.json();
            const city = data.address.city || data.address.town || data.address.village || data.address.county || 'Current Location';
            const state = data.address.state || '';
            fetchWeather(latitude, longitude, `${city}${state ? `, ${state}` : ''}`);
          } catch (e) {
            fetchWeather(latitude, longitude, 'Current Location');
          }
        },
        (err) => {
          console.error(err);
          // Fallback to San Francisco if denied
          fetchWeather(37.7749, -122.4194, 'San Francisco, CA');
        }
      );
    } else {
      // Fallback to San Francisco if not supported
      fetchWeather(37.7749, -122.4194, 'San Francisco, CA');
    }
  }, []);

  if (isLoading && !weatherData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-800 flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Sun className="w-16 h-16 text-yellow-400" />
        </motion.div>
      </div>
    );
  }

  // Format data for UI
  const current = weatherData?.current;
  const daily = weatherData?.daily;
  const hourly = weatherData?.hourly;

  // Get next 24 hours
  const currentHourIndex = hourly?.time.findIndex((t: string) => new Date(t).getTime() > Date.now()) || 0;
  const next24Hours = hourly?.time.slice(currentHourIndex, currentHourIndex + 24).map((time: string, i: number) => ({
    time: new Date(time).toLocaleTimeString([], { hour: 'numeric' }),
    temp: Math.round(hourly.temperature_2m[currentHourIndex + i]),
    code: hourly.weather_code[currentHourIndex + i],
    isDay: new Date(time).getHours() > 6 && new Date(time).getHours() < 19 // Rough estimate for icon
  })) || [];

  // Get next 7 days
  const next7Days = daily?.time.map((time: string, i: number) => ({
    day: i === 0 ? 'Today' : new Date(time).toLocaleDateString([], { weekday: 'short' }),
    high: Math.round(daily.temperature_2m_max[i]),
    low: Math.round(daily.temperature_2m_min[i]),
    code: daily.weather_code[i],
  })) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-900 text-white font-sans selection:bg-white/30 p-4 md:p-8 flex justify-center">
      <div className="w-full max-w-5xl">
        
        {/* Navigation & Search */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 z-50 relative"
        >
          <Link to="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 self-start md:self-auto">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Portfolio</span>
          </Link>
          
          <div className="relative w-full md:w-auto z-50">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/60" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search city..." 
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 w-full md:w-64 transition-all"
            />
            
            {/* Search Results Dropdown */}
            <AnimatePresence>
              {searchResults.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full mt-2 w-full bg-indigo-900/90 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl z-50"
                >
                  {searchResults.map((result, idx) => (
                    <button
                      key={idx}
                      onClick={() => selectLocation(result)}
                      className="w-full text-left px-4 py-3 hover:bg-white/10 transition-colors border-b border-white/5 last:border-0 flex flex-col"
                    >
                      <span className="font-medium">{result.name}</span>
                      <span className="text-xs text-white/60">
                        {result.admin1 ? `${result.admin1}, ` : ''}{result.country}
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-white px-4 py-3 rounded-xl mb-6 backdrop-blur-md">
            {error}
          </div>
        )}

        {weatherData && (
          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* Main Weather Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
            >
              {/* Decorative background glow */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <div className="flex items-center gap-2 text-white/80 mb-2">
                    <MapPin className="w-5 h-5" />
                    <h2 className="text-xl font-medium">{locationName}</h2>
                  </div>
                  <h1 className="text-8xl font-bold tracking-tighter mb-4">
                    {Math.round(current.temperature_2m)}°
                  </h1>
                  <p className="text-2xl font-medium mb-1">{getWeatherCondition(current.weather_code)}</p>
                  <p className="text-white/70">H:{Math.round(daily.temperature_2m_max[0])}° L:{Math.round(daily.temperature_2m_min[0])}°</p>
                </div>
                <div className="w-32 h-32 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  {getWeatherIcon(current.weather_code, current.is_day === 1)}
                </div>
              </div>

              {/* Hourly Forecast */}
              <div className="mt-12 pt-8 border-t border-white/10">
                <div className="flex items-center gap-2 mb-6 text-white/80">
                  <Calendar className="w-4 h-4" />
                  <h3 className="font-medium uppercase tracking-wider text-sm">24-Hour Forecast</h3>
                </div>
                <div className="flex justify-between items-center overflow-x-auto pb-4 scrollbar-hide gap-6">
                  {next24Hours.map((hour: any, idx: number) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + idx * 0.02 }}
                      className="flex flex-col items-center gap-3 min-w-[60px]"
                    >
                      <span className="text-white/70 text-sm whitespace-nowrap">{hour.time}</span>
                      <div className="w-6 h-6">
                        {getWeatherIcon(hour.code, hour.isDay)}
                      </div>
                      <span className="font-semibold text-lg">{hour.temp}°</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 7-Day Forecast */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-6 text-white/80">
                <Calendar className="w-4 h-4" />
                <h3 className="font-medium uppercase tracking-wider text-sm">7-Day Forecast</h3>
              </div>
              <div className="space-y-4">
                {next7Days.map((day: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <span className="w-12 font-medium text-white/90">{day.day}</span>
                    <div className="flex items-center gap-3 flex-1 justify-center">
                      <div className="w-6 h-6">
                        {getWeatherIcon(day.code, true)}
                      </div>
                      <span className="text-sm text-white/70 hidden sm:block w-24 truncate">{getWeatherCondition(day.code)}</span>
                    </div>
                    <div className="flex items-center gap-3 w-24 justify-end font-medium">
                      <span className="text-white/60">{day.low}°</span>
                      <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-400 to-yellow-400 w-full" />
                      </div>
                      <span>{day.high}°</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Metrics Grid */}
            <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Humidity', value: `${current.relative_humidity_2m}%`, icon: <Droplets className="w-5 h-5" />, desc: 'Current relative humidity.' },
                { label: 'Wind', value: `${current.wind_speed_10m} mph`, icon: <Wind className="w-5 h-5" />, desc: 'Current wind speed.' },
                { label: 'Feels Like', value: `${Math.round(current.apparent_temperature)}°`, icon: <Thermometer className="w-5 h-5" />, desc: 'Apparent temperature.' },
                { label: 'Precipitation', value: `${current.precipitation} in`, icon: <CloudRain className="w-5 h-5" />, desc: 'Rainfall in the last hour.' },
              ].map((metric, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl flex flex-col justify-between"
                >
                  <div className="flex items-center gap-2 text-white/70 mb-4">
                    {metric.icon}
                    <h3 className="font-medium uppercase tracking-wider text-xs">{metric.label}</h3>
                  </div>
                  <div>
                    <p className="text-3xl font-semibold mb-2">{metric.value}</p>
                    <p className="text-sm text-white/60 leading-snug">{metric.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
